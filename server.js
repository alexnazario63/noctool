const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.cwd());
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "0.0.0.0";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((request, response) => {
  const [pathname] = (request.url || "/").split("?");

  if (pathname === "/api/config" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || "" }));
    return;
  }

  if (pathname === "/api/city" && request.method === "POST") {
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

        const cleanQuery = query.trim().toLowerCase();
        if (!/^[a-z0-9]{2,8}$/.test(cleanQuery)) {
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ error: "Código CNL inválido." }));
          return;
        }

        const formData = new URLSearchParams({ q: cleanQuery });
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

  const requestedPath = decodeURIComponent(pathname);
  let safePath = path
    .normalize(requestedPath === "/" ? "/index.html" : requestedPath)
    .replace(/^[/\\]+/, "");
  let filePath = path.resolve(root, safePath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, "index.html");
    if (fs.existsSync(indexPath)) {
      filePath = indexPath;
    }
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

server.listen(port, host, () => {
  console.log(`DSCTOOL disponível em http://${host === "0.0.0.0" ? "localhost" : host}:${port}`);
});

server.on("error", (error) => {
  console.error(error.message);
});
