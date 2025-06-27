export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace(/^\/api\/produtos/, "").replace(/^\/+/, "");
    const query = url.search;
    const targetUrl = `http://leoproti.com.br:8004/produtos${path ? `/${path}` : ""}${query}`;

    console.log("🔗 Target:", targetUrl);

    // Use headers explícitos (sem herdar todos os do req)
    const headers = {
      "Content-Type": "application/json",
    };

    // Ler corpo da requisição apenas se necessário
    let body = null;
    if (!["GET", "HEAD"].includes(req.method)) {
      try {
        const json = await req.json(); // <-- aqui pode falhar silenciosamente
        body = JSON.stringify(json);
        console.log("📦 Corpo JSON:", body);
      } catch (err) {
        console.error("❌ Falha ao ler o body:", err.message);
        return res.status(400).json({ erro: "Formato do corpo inválido." });
      }
    }

    // Faz o repasse para o backend
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
    console.error("🔥 Erro no proxy:", err.message);
    res.status(500).json({ erro: "Erro no proxy", detalhe: err.message });
  }
}
