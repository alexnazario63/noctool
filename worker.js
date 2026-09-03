const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...SECURITY_HEADERS },
  });
}

function secureResponse(response) {
  const headers = new Headers(response.headers);
  Object.entries(SECURITY_HEADERS).forEach(([name, value]) => headers.set(name, value));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function recordApiEvent(env, route, statusCode, errorMessage) {
  if (!env.DB) return;
  try {
    await env.DB.prepare(
      "INSERT INTO api_events (route, status_code, error_message) VALUES (?, ?, ?)",
    ).bind(route, statusCode, errorMessage || null).run();
  } catch (error) {
    console.error("Falha ao registrar evento da API:", error.message);
  }
}

async function verifyTurnstile(request, env, token) {
  const required = env.TURNSTILE_REQUIRED === "true";
  if (!env.TURNSTILE_SECRET_KEY) return !required;
  if (!token) return false;

  const formData = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) formData.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });
  const result = await response.json();
  return response.ok && result.success === true;
}

async function readCityCache(env, query) {
  if (!env.DB) return null;
  try {
    return await env.DB.prepare(
      "SELECT response_html, status_code FROM city_cache WHERE query = ? AND expires_at > unixepoch()",
    ).bind(query).first();
  } catch (error) {
    console.error("Falha ao ler cache D1:", error.message);
    return null;
  }
}

async function writeCityCache(env, query, html, statusCode) {
  if (!env.DB || statusCode < 200 || statusCode >= 300) return;
  try {
    await env.DB.prepare(
      "INSERT INTO city_cache (query, response_html, status_code, expires_at) VALUES (?, ?, ?, unixepoch() + 86400) ON CONFLICT(query) DO UPDATE SET response_html = excluded.response_html, status_code = excluded.status_code, expires_at = excluded.expires_at",
    ).bind(query, html, statusCode).run();
  } catch (error) {
    console.error("Falha ao gravar cache D1:", error.message);
  }
}

async function handleApi(request, env, ctx) {
  const url = new URL(request.url);

  if (url.pathname === "/api/config" && request.method === "GET") {
    return jsonResponse({ turnstileSiteKey: env.TURNSTILE_SITE_KEY || "" });
  }

  if (url.pathname === "/api/city" && request.method === "POST") {
    try {
      const contentLength = Number(request.headers.get("Content-Length") || 0);
      if (contentLength > 4096) {
        ctx.waitUntil(recordApiEvent(env, "/api/city", 413, "Payload excede o limite."));
        return jsonResponse({ error: "Consulta muito grande." }, 413);
      }

      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).byteLength > 4096) {
        ctx.waitUntil(recordApiEvent(env, "/api/city", 413, "Payload excede o limite."));
        return jsonResponse({ error: "Consulta muito grande." }, 413);
      }

      const body = JSON.parse(rawBody || "{}");
      const query = typeof body.query === "string" ? body.query.trim().toLowerCase() : "";
      if (!/^[a-z0-9]{2,8}$/.test(query)) {
        ctx.waitUntil(recordApiEvent(env, "/api/city", 400, "Código CNL inválido."));
        return jsonResponse({ error: "Informe o código CNL." }, 400);
      }
      if (!(await verifyTurnstile(request, env, body.turnstileToken))) {
        ctx.waitUntil(recordApiEvent(env, "/api/city", 403, "Turnstile rejeitou a consulta."));
        return jsonResponse({ error: "Validação de segurança recusada." }, 403);
      }

      const cached = await readCityCache(env, query);
      if (cached) {
        return new Response(cached.response_html, {
          status: cached.status_code,
          headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS, "X-Cache": "HIT" },
        });
      }

      const upstream = await fetch("https://dev.onerio.pw/raphael/index.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ q: query.trim().toLowerCase() }),
      });
      const html = await upstream.text();
      await writeCityCache(env, query, html, upstream.status);
      if (!upstream.ok) {
        ctx.waitUntil(recordApiEvent(env, "/api/city", upstream.status, "Serviço externo indisponível."));
      }
      return new Response(html, {
        status: upstream.status,
        headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS, "X-Cache": "MISS" },
      });
    } catch (error) {
      ctx.waitUntil(recordApiEvent(env, "/api/city", 502, error.message));
      return jsonResponse({ error: `Falha na consulta externa: ${error.message}` }, 502);
    }
  }

  return null;
}

export default {
  async fetch(request, env, ctx) {
    const apiResponse = await handleApi(request, env, ctx);
    return secureResponse(apiResponse || await env.ASSETS.fetch(request));
  },
};