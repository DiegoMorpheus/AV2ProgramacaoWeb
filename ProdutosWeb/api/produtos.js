export default async function handler(req, res) {
  const baseUrl = 'http://leoproti.com.br:8004/produtos';
  const path = req.url.replace('/api/produtos', '');
  const targetUrl = baseUrl + path;

  const options = {
    method: req.method,
    headers: { ...req.headers, host: undefined },
    body: ['GET', 'HEAD'].includes(req.method) ? null : req,
  };

  try {
    const response = await fetch(targetUrl, options);
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detalhes: err.message });
  }
}
