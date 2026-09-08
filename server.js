const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const root = path.resolve(process.cwd());
if (typeof process.loadEnvFile === "function") {
  const localEnvPath = path.join(root, ".env.local");
  const publicEnvPath = path.join(root, ".env");
  if (fs.existsSync(localEnvPath)) process.loadEnvFile(localEnvPath);
  if (fs.existsSync(publicEnvPath)) process.loadEnvFile(publicEnvPath);
}
const port = Number(process.env.PORT || 5173);
const adminConfigRoot = path.join(root, "admin", "config");
const adminConfigModules = ["messages", "partners", "failures", "settings"];
const adminDatabasePath = path.join(root, "admin", "data", "admin.sqlite");
const adminSessions = new Map();
const adminSessionTtlMs = 8 * 60 * 60 * 1000;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

function readZabbixConfig() {
  let localConfig = {};

  try {
    const configPath = path.join(root, "zabbix.local.json");
    if (fs.existsSync(configPath)) {
      localConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    }
  } catch (error) {
    console.warn("Falha ao ler zabbix.local.json:", error.message);
  }

  const rawUrl = process.env.ZABBIX_URL || localConfig.url || "";
  const url = rawUrl && !/^https?:\/\//i.test(rawUrl) ? `http://${rawUrl}` : rawUrl;

  return {
    url,
    token: process.env.ZABBIX_TOKEN || localConfig.token || "",
  };
}

async function fetchZabbixAlarms(hosts) {
  const { url, token } = readZabbixConfig();

  if (!url || !token) {
    return {
      configured: false,
      alarms: [],
      message: "ZABBIX_URL não configurada. Token local encontrado, mas falta a URL api_jsonrpc.php.",
    };
  }

  try {
    const hostData = await zabbixRequest("host.get", {
      output: ["hostid", "host", "name"],
      filter: { host: hosts },
    }, 1, true);

    let hostResult = hostData.result || [];
    if (!hostResult.length) {
      const fallbackHostData = await zabbixRequest("host.get", {
        output: ["hostid", "host", "name"],
        search: { host: hosts.join(" ") },
        searchByAny: true,
      }, 11, true);
      hostResult = fallbackHostData.result || [];
    }

    const hostMap = {};
    const hostIds = hostResult.map(h => {
      hostMap[h.hostid] = h.host || h.name || h.hostid;
      return h.hostid;
    });

    if (hostIds.length === 0) return { configured: true, alarms: [] };

    const probData = await zabbixRequest("problem.get", {
      hostids: hostIds,
      recent: true,
      sortfield: ["eventid"],
      sortorder: "DESC",
      output: ["eventid", "name", "clock", "severity", "objectid"],
    }, 2, true);

    const alarms = (probData.result || []).map(p => {
      const date = new Date(Number(p.clock) * 1000).toLocaleString("pt-BR");
      const host = hostIds.length === 1 ? hostMap[hostIds[0]] : "";
      return [date, host, p.name].filter(Boolean).join(" - ");
    });

    return { configured: true, alarms };
  } catch (err) {
    console.error("Erro na API Zabbix:", err);
    return { configured: true, alarms: [`Erro ao buscar alarmes: ${err.message}`] };
  }
}

async function zabbixRequest(method, params, id, authenticated) {
  const { url, token } = readZabbixConfig();
  const body = {
    jsonrpc: "2.0",
    method,
    params,
    id,
  };

  const contentTypesToTry = ["application/json-rpc", "application/json"];
  let lastError = null;

  for (const contentType of contentTypesToTry) {
    const headers = {
      "Content-Type": contentType,
      "Accept": "application/json",
      "User-Agent": "DESCTOOL-Zabbix-Proxy/1.0",
    };

    if (authenticated && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    if (response.status === 412) {
      lastError = new Error(`HTTP 412 usando ${contentType}. Verifique se a URL termina em api_jsonrpc.php e se o servidor aceita POST com Content-Type correto.`);
      continue;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText || response.statusText}`);
    }

    const data = responseText ? JSON.parse(responseText) : {};
    if (data.error) {
      throw new Error(`${data.error.message || "Erro Zabbix"}: ${data.error.data || ""}`.trim());
    }

    return data;
  }

  throw lastError || new Error("Falha ao chamar Zabbix.");
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", chunk => { body += chunk.toString(); });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getCookie(request, name) {
  const cookies = String(request.headers.cookie || "").split(";");
  const entry = cookies.find(cookie => cookie.trim().startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.trim().slice(name.length + 1)) : "";
}

function getAdminSession(request) {
  const token = getCookie(request, "noc_admin_session");
  const session = adminSessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    if (token) adminSessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + adminSessionTtlMs;
  return session;
}

function sendJson(response, statusCode, payload, headers = {}) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8", ...headers });
  response.end(JSON.stringify(payload));
}

function requireAdminSession(request, response) {
  if (getAdminSession(request)) return true;
  sendJson(response, 401, { ok: false, error: "Autenticação administrativa necessária." });
  return false;
}

function openAdminDatabase() {
  fs.mkdirSync(path.dirname(adminDatabasePath), { recursive: true });
  const database = new DatabaseSync(adminDatabasePath);
  database.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS config_modules (
      module_name TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  return database;
}

function readSeedModule(moduleName) {
  const filePath = path.join(adminConfigRoot, `${moduleName}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    const projectFile = moduleName === "partners"
      ? path.join(root, "descricao-main", "data", "parceiras.json")
      : moduleName === "failures"
        ? path.join(root, "descricao-main", "data", "tipos-de-falhas.json")
        : "";
    try {
      const projectValue = projectFile ? JSON.parse(fs.readFileSync(projectFile, "utf8")) : null;
      if (moduleName === "failures") return projectValue?.[0] || {};
      if (moduleName === "partners") return (projectValue || []).map(name => ({ name: String(name).trim(), recipients: "", phone: "", language: "pt" }));
    } catch (projectError) {
      return moduleName === "partners" ? [] : {};
    }
    return moduleName === "partners" ? [] : {};
  }
}

function readAdminModules() {
  const database = openAdminDatabase();
  const rows = database.prepare("SELECT module_name, payload FROM config_modules").all();
  const stored = new Map(rows.map(row => [row.module_name, row.payload]));
  const modules = {};

  adminConfigModules.forEach(moduleName => {
    if (!stored.has(moduleName)) {
      modules[moduleName] = readSeedModule(moduleName);
      return;
    }
    try {
      modules[moduleName] = JSON.parse(stored.get(moduleName));
    } catch (error) {
      modules[moduleName] = readSeedModule(moduleName);
    }
  });
  database.close();
  return modules;
}

function writeAdminModules(modules) {
  const database = openAdminDatabase();
  const saveModule = database.prepare(`
    INSERT INTO config_modules (module_name, payload, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(module_name) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at
  `);
  const updatedAt = new Date().toISOString();

  database.exec("BEGIN IMMEDIATE");
  try {
    adminConfigModules.forEach(moduleName => {
      if (moduleName in modules) saveModule.run(moduleName, JSON.stringify(modules[moduleName]), updatedAt);
    });
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  } finally {
    database.close();
  }
}

function githubRepository() {
  return process.env.GITHUB_REPOSITORY || "alexnazario61/DSCTOOL";
}

async function githubRequest(pathname, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN não configurado no servidor.");
  return fetch(`https://api.github.com${pathname}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
}

function incrementPatchVersion(value) {
  const normalized = String(value || "0.0.0").trim().replace(/^v/i, "");
  const parts = normalized.split(".").map(part => Number.parseInt(part, 10) || 0);
  while (parts.length < 3) parts.push(0);
  parts[2] += 1;
  return `${parts[0]}.${parts[1]}.${parts[2]}`;
}

async function readGithubFile(pathName, branch) {
  const response = await githubRequest(`/repos/${githubRepository()}/contents/${pathName}?ref=${encodeURIComponent(branch)}`);
  if (response.status === 404) return { content: "", sha: "" };
  if (!response.ok) throw new Error(`GitHub não retornou ${pathName}: HTTP ${response.status}`);
  const file = await response.json();
  return {
    content: Buffer.from(file.content || "", "base64").toString("utf8"),
    sha: file.sha || "",
  };
}

async function publishGithubFile(pathName, content, branch, message) {
  const current = await readGithubFile(pathName, branch);
  const response = await githubRequest(`/repos/${githubRepository()}/contents/${pathName}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      ...(current.sha ? { sha: current.sha } : {}),
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao gravar ${pathName} no GitHub: HTTP ${response.status} ${errorText}`);
  }
}

function updateVersionReferences(pathName, content, version) {
  if (pathName === "app.js") {
    return content.replace(/(const CURRENT_APP_VERSION\s*=\s*["'])[^"']+(["'];)/, `$1${version}$2`);
  }
  if (pathName === "js/translations.js") {
    return content.replace(/(version:\s*["']Version\s+)[^"']+(["'])/g, `$1${version}$2`);
  }
  if (pathName === "index.html") {
    return content
      .replace(/([?&]v=)[0-9]+\.[0-9]+\.[0-9]+/g, `$1${version}`)
      .replace(/(data-i18n="version">Version\s+)[0-9]+\.[0-9]+\.[0-9]+/g, `$1${version}`);
  }
  return content;
}

async function commitAdminModulesToGithub(modules) {
  const repository = githubRepository();
  const branch = process.env.GITHUB_BRANCH || "main";
  const currentVersionFile = await readGithubFile("version.json", branch);
  let currentVersion = "0.0.0";
  try {
    currentVersion = JSON.parse(currentVersionFile.content || "{}").version || currentVersion;
  } catch (error) {
    currentVersion = currentVersionFile.content.trim() || currentVersion;
  }
  const version = incrementPatchVersion(currentVersion);
  const message = process.env.GITHUB_CONFIG_COMMIT_MESSAGE || `chore: publish admin configuration v${version}`;
  const committed = [];

  for (const moduleName of adminConfigModules) {
    if (!(moduleName in modules)) continue;
    const pathName = `admin/config/${moduleName}.json`;
    await publishGithubFile(pathName, `${JSON.stringify(modules[moduleName], null, 2)}\n`, branch, message);
    committed.push(pathName);
  }

  for (const pathName of ["app.js", "js/translations.js", "index.html"]) {
    const source = await readGithubFile(pathName, branch);
    const updated = updateVersionReferences(pathName, source.content, version);
    if (updated === source.content) {
      throw new Error(`Nenhuma referência de versão reconhecida em ${pathName}.`);
    }
    await publishGithubFile(pathName, updated, branch, message);
    committed.push(pathName);
  }

  await publishGithubFile("version.json", `${JSON.stringify({ version, timestamp: new Date().toISOString() }, null, 2)}\n`, branch, message);
  await publishGithubFile("version.txt", `${version}\n`, branch, message);
  committed.push("version.json", "version.txt");

  return { repository, branch, version, committed };
}

const server = http.createServer((request, response) => {
  if (request.url === "/api/admin/login" && request.method === "POST") {
    readRequestBody(request).then(body => {
      const payload = JSON.parse(body || "{}");
      const configuredUser = process.env.ADMIN_USER;
      const configuredPassword = process.env.ADMIN_PASSWORD;
      if (!configuredUser || !configuredPassword) {
        sendJson(response, 503, { ok: false, error: "ADMIN_USER e ADMIN_PASSWORD não configurados no .env." });
        return;
      }
      if (!safeEqual(payload.username, configuredUser) || !safeEqual(payload.password, configuredPassword)) {
        sendJson(response, 401, { ok: false, error: "Usuário ou senha inválidos." });
        return;
      }
      const token = crypto.randomBytes(32).toString("hex");
      adminSessions.set(token, { expiresAt: Date.now() + adminSessionTtlMs });
      sendJson(response, 200, { ok: true }, { "Set-Cookie": `noc_admin_session=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${adminSessionTtlMs / 1000}` });
    }).catch(error => sendJson(response, 400, { ok: false, error: error.message }));
    return;
  }

  if (request.url === "/api/admin/session" && request.method === "GET") {
    sendJson(response, 200, { authenticated: Boolean(getAdminSession(request)) });
    return;
  }

  if (request.url === "/api/admin/logout" && request.method === "POST") {
    const token = getCookie(request, "noc_admin_session");
    adminSessions.delete(token);
    sendJson(response, 200, { ok: true }, { "Set-Cookie": "noc_admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" });
    return;
  }

  if (request.url === "/api/admin/config" && request.method === "GET") {
    if (!requireAdminSession(request, response)) return;
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(readAdminModules()));
    return;
  }

  if (request.url === "/api/admin/config" && request.method === "PUT") {
    if (!requireAdminSession(request, response)) return;
    readRequestBody(request).then(body => {
      const payload = JSON.parse(body || "{}");
      writeAdminModules(payload.modules || payload);
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ ok: true, modules: readAdminModules() }));
    }).catch(error => {
      response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ ok: false, error: error.message }));
    });
    return;
  }

  if (request.url === "/api/admin/github" && request.method === "POST") {
    if (!requireAdminSession(request, response)) return;
    readRequestBody(request).then(async body => {
      const payload = JSON.parse(body || "{}");
      const result = await commitAdminModulesToGithub(payload.modules || payload);
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ ok: true, ...result }));
    }).catch(error => {
      response.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ ok: false, error: error.message }));
    });
    return;
  }

  if (request.url === "/api/city" && request.method === "POST") {
    let body = "";
    request.on("data", chunk => { body += chunk.toString(); });
    request.on("end", async () => {
      try {
        const { query } = JSON.parse(body || "{}");
        if (!query || typeof query !== "string") {
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ error: "Informe o código CNL." }));
          return;
        }

        const formData = new URLSearchParams({ q: query.trim().toLowerCase() });
        const upstream = await fetch("https://dev.onerio.pw/raphael/index.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });
        const html = await upstream.text();
        response.writeHead(upstream.ok ? 200 : upstream.status, { "Content-Type": "text/html; charset=utf-8" });
        response.end(html);
      } catch (error) {
        response.writeHead(502, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: `Falha na consulta externa: ${error.message}` }));
      }
    });
    return;
  }

  if (request.url === "/api/zabbix/alarms" && request.method === "POST") {
    let body = "";
    request.on("data", chunk => { body += chunk.toString(); });
    request.on("end", async () => {
      try {
        const { hosts } = JSON.parse(body);
        const result = await fetchZabbixAlarms(hosts || []);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(result));
      } catch (e) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (request.url === "/api/zabbix/test" && request.method === "GET") {
    zabbixRequest("apiinfo.version", {}, 99, false)
      .then((result) => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ ok: true, version: result.result }));
      })
      .catch((error) => {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ ok: false, error: error.message }));
      });
    return;
  }

  const requestedPath = decodeURIComponent(request.url.split("?")[0]);
  const safePath = path
    .normalize(requestedPath === "/" ? "/index.html" : requestedPath)
    .replace(/^[/\\]+/, "");
  const filePath = path.resolve(root, safePath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (path.basename(filePath) === ".env" || filePath.includes(`${path.sep}.env.`)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    response.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`DESCTOOL disponível em http://127.0.0.1:${port}`);
});

server.on("error", (error) => {
  console.error(error.message);
});
