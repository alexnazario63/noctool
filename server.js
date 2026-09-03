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

const server = http.createServer((request, response) => {
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
