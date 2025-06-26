export default async function handler(req, res) {
  try {
    // Constrói a URL base recebida
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Extrai o path corretamente, removendo a parte da rota local
    const path = url.pathname.replace(/^\/api\/produtos/, "");
    const query = url.search; // inclui "?algo=valor"
    const targetUrl = `http://leoproti.com.br:8004/produtos${path}${query}`;

    console.log("Método:", req.method);
    console.log("Path:", path);
    console.log("Destino final:", targetUrl);

    // Copia os headers e remove o 'host' (para não conflitar com o destino)
    const headers = { ...req.headers };
    delete headers.host;

    // Prepara o corpo da requisição, se aplicável
    let body = null;
    if (!['GET', 'HEAD'].includes(req.method)) {
      try {
        body = JSON.stringify(await req.json());
      } catch (err) {
        console.error("Erro ao analisar o body da requisição:", err);
        return res.status(400).json({ erro: "Formato do corpo inválido." });
      }
    }

    // Realiza o proxy para o servidor de destino
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const contentType = response.headers.get('content-type') || '';
    res.status(response.status);

    if (contentType.includes('application/json')) {
      const json = await response.json();
      res.json(json);
    } else {
      const text = await response.text();
      res.send(text);
    }

  } catch (err) {
    console.error("Erro ao redirecionar requisição:", err);
    res.status(500).json({
      error: "Erro no proxy",
      detalhe: err.message,
    });
  }
}
