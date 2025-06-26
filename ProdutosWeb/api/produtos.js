export default async function handler(req, res) {
  // Constrói a URL corretamente, independentemente de barras extras ou query strings
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace(/^\/api\/produtos/, "");
  const targetUrl = `http://leoproti.com.br:8004/produtos${path}`;

  console.log("Método:", req.method);
  console.log("Path resultante:", path);
  console.log("Destino final:", targetUrl);

  const headers = { ...req.headers };
  delete headers.host;

  let body = null;

  if (!['GET', 'HEAD'].includes(req.method)) {
    try {
      body = JSON.stringify(await req.json());
    } catch (err) {
      console.error("Erro ao ler o corpo da requisição:", err);
      return res.status(400).json({ erro: "Body inválido" });
    }
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
    console.error("Erro ao fazer proxy para o destino:", err);
    res.status(500).json({
      error: "Erro no proxy",
      detalhe: err.message,
    });
  }
}
