const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.cwd());
const port = Number(process.env.PORT || 5173);

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

const server = http.createServer((request, response) => {
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
