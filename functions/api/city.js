async function recordApiEvent(env, route, statusCode, errorMessage) {
  if (!env || !env.DB) return;
  try {
    await env.DB.prepare(
      "INSERT INTO api_events (route, status_code, error_message) VALUES (?, ?, ?)",
    ).bind(route, statusCode, errorMessage || null).run();
  } catch (error) {
    console.error("Falha ao registrar evento da API:", error.message);
  }
}

async function verifyTurnstile(request, env, token) {
  const required = env && env.TURNSTILE_REQUIRED === "true";
  if (!env || !env.TURNSTILE_SECRET_KEY) return !required;
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
  if (!env || !env.DB) return null;
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
  if (!env || !env.DB || statusCode < 200 || statusCode >= 300) return;
  try {
    await env.DB.prepare(
      "INSERT INTO city_cache (query, response_html, status_code, expires_at) VALUES (?, ?, ?, unixepoch() + 86400) ON CONFLICT(query) DO UPDATE SET response_html = excluded.response_html, status_code = excluded.status_code, expires_at = excluded.expires_at",
    ).bind(query, html, statusCode).run();
  } catch (error) {
    console.error("Falha ao gravar cache D1:", error.message);
  }
}

export async function onRequestPost(context) {
  const { request, env, waitUntil } = context;

  const runBg = (promise) => {
    if (typeof waitUntil === "function") {
      waitUntil(promise);
    } else {
      promise.catch(err => console.error("Erro em tarefa de background:", err));
    }
  };

  try {
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 4096) {
      runBg(recordApiEvent(env, "/api/city", 413, "Payload excede o limite."));
      return new Response(JSON.stringify({ error: "Consulta muito grande." }), {
        status: 413,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 4096) {
      runBg(recordApiEvent(env, "/api/city", 413, "Payload excede o limite."));
      return new Response(JSON.stringify({ error: "Consulta muito grande." }), {
        status: 413,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const body = JSON.parse(rawBody || "{}");
    const query = typeof body.query === "string" ? body.query.trim().toLowerCase() : "";
    if (!/^[a-z0-9]{2,8}$/.test(query)) {
      runBg(recordApiEvent(env, "/api/city", 400, "Código CNL inválido."));
      return new Response(JSON.stringify({ error: "Informe o código CNL." }), {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    if (!(await verifyTurnstile(request, env, body.turnstileToken))) {
      runBg(recordApiEvent(env, "/api/city", 403, "Turnstile rejeitou a consulta."));
      return new Response(JSON.stringify({ error: "Validação de segurança recusada." }), {
        status: 403,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const cached = await readCityCache(env, query);
    if (cached) {
      return new Response(cached.response_html, {
        status: cached.status_code,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Cache": "HIT",
        },
      });
    }

    const upstream = await fetch("https://dev.onerio.pw/raphael/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ q: query }),
    });

    const html = await upstream.text();
    await writeCityCache(env, query, html, upstream.status);

    if (!upstream.ok) {
      runBg(recordApiEvent(env, "/api/city", upstream.status, "Serviço externo indisponível."));
    }

    return new Response(html, {
      status: upstream.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    runBg(recordApiEvent(env, "/api/city", 502, error.message));
    return new Response(JSON.stringify({ error: `Falha na consulta externa: ${error.message}` }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}

