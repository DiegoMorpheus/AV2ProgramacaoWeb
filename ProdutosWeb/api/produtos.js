export default async function handler(req, res) {
  const path = req.url.replace("/api/produtos", "");
  const targetUrl = `http://leoproti.com.br:8004/produtos${path}`;

  const headers = { ...req.headers };
  delete headers.host;

  let body = null;

  if (!['GET', 'HEAD'].includes(req.method)) {
    body = JSON.stringify(await req.json());
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const contentType = response.headers.get('content-type') || '';
    const result = await (contentType.includes('application/json')
      ? response.json()
      : response.text());

    res.status(response.status).send(result);
  } catch (err) {
    res.status(500).json({
      error: "Erro no proxy",
      detalhe: err.message,
    });
  }
}
