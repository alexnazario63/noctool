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

async function fetchZabbixAlarms(hosts) {
  const url = process.env.ZABBIX_URL;
  const token = process.env.ZABBIX_TOKEN;

  if (!url || !token) {
    console.warn("ZABBIX_URL ou ZABBIX_TOKEN não configurados. Retornando dados mockados.");
    return hosts.map(host => `2026-06-07 14:00:00 - ${host} - Indisponível (Mock)`);
  }

  try {
    const hostReq = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json-rpc" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "host.get",
        params: { filter: { name: hosts } },
        auth: token,
        id: 1
      })
    });
    
    const hostData = await hostReq.json();
    const hostMap = {};
    const hostIds = (hostData.result || []).map(h => {
      hostMap[h.hostid] = h.name;
      return h.hostid;
    });

    if (hostIds.length === 0) return [];

    const probReq = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json-rpc" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "problem.get",
        params: {
          hostids: hostIds,
          recent: true,
          sortfield: ["eventid"],
          sortorder: "DESC"
        },
        auth: token,
        id: 2
      })
    });

    const probData = await probReq.json();
    return (probData.result || []).map(p => {
      const date = new Date(p.clock * 1000).toLocaleString("pt-BR");
      return `${date} - Problema: ${p.name}`;
    });
  } catch (err) {
    console.error("Erro na API Zabbix:", err);
    return [`Erro ao buscar alarmes: ${err.message}`];
  }
}

const server = http.createServer((request, response) => {
  if (request.url === "/api/zabbix/alarms" && request.method === "POST") {
    let body = "";
    request.on("data", chunk => { body += chunk.toString(); });
    request.on("end", async () => {
      try {
        const { hosts } = JSON.parse(body);
        const alarms = await fetchZabbixAlarms(hosts || []);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ alarms }));
      } catch (e) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  const requestedPath = decodeURIComponent(request.url.split("?")[0]);
  const routedPath = requestedPath === "/admin" || requestedPath === "/admin/"
    ? "/admin.html"
    : requestedPath;
  const safePath = path
    .normalize(routedPath === "/" ? "/index.html" : routedPath)
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
