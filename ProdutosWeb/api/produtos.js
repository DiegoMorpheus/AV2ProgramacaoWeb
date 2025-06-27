import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Monta o path final com segurança
    const fullPath = req.url.replace(/^\/api\/produtos/, "").replace(/^\/+/, "");
    const queryIndex = fullPath.indexOf("?");
    const path = queryIndex >= 0 ? fullPath.slice(0, queryIndex) : fullPath;
    const query = queryIndex >= 0 ? fullPath.slice(queryIndex) : "";

    const targetUrl = `http://leoproti.com.br:8004/produtos${path ? `/${path}` : ""}${query}`;
    console.log("🔗 Proxy para:", targetUrl);

    // Define headers apenas quando necessário
    const headers = {};
    let body = null;

    if (!["GET", "HEAD"].includes(req.method)) {
      headers["Content-Type"] = "application/json";

      try {
        const json = await req.json();
        body = JSON.stringify(json);
        console.log("📦 Enviando corpo JSON:", body);
      } catch (err) {
        console.error("❌ Erro ao ler body:", err.message);
        return res.status(400).json({ erro: "Formato do corpo inválido." });
      }
    }

    // Encaminha requisição para o backend real
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
