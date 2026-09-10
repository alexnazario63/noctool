export async function onRequestGet(context) {
  const { env } = context;
  const turnstileSiteKey = env.TURNSTILE_SITE_KEY || "";

  return new Response(JSON.stringify({ turnstileSiteKey }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

