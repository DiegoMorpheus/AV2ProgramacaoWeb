export default async function handler(req, res) {
  try {
    // Monta a URL final com segurança
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace(/^\/api\/produtos/, "").replace(/^\/+/, "");
    const query = url.search;
    const targetUrl = `http://leoproti.com.br:8004/produtos${path ? `/${path}` : ""}${query}`;

    console.log("Método:", req.method);
    console.log("Path:", path);
    console.log("Destino final:", targetUrl);

    // Define headers fixos para evitar conflitos
    const headers = {
      "Content-Type": "application/json"
    };

    // Prepara o corpo da requisição, se necessário
    let body = null;
    if (!["GET", "HEAD"].includes(req.method)) {
      try {
        const json = await req.json();
        body = JSON.stringify(json);
        console.log(" Corpo da requisição:", body);
      } catch (err) {
        console.error(" Erro ao analisar o body:", err);
        return res.status(400).json({ erro: "Formato do corpo inválido." });
      }
    }

    // Encaminha a requisição para o servidor
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const contentType = response.headers.get("content-type") || "";
    res.status(response.status);

    if (contentType.includes("application/json")) {
      const json = await response.json();
      res.json(json);
    } else {
      const text = await response.text();
      res.send(text);
    }

  } catch (err) {
    console.error(" Erro no proxy:", err);
    res.status(500).json({
      error: "Erro no proxy",
      detalhe: err.message,
    });
  }
}
