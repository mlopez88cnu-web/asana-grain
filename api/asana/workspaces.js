/**
 * Asana API proxy: list workspaces.
 * Requires env ASANA_ACCESS_TOKEN (Personal Access Token with workspaces:read).
 */
const ASANA_BASE = 'https://app.asana.com/api/1.0';

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const token = process.env.ASANA_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'Server missing ASANA_ACCESS_TOKEN. Add it in Vercel (or .env) and redeploy.',
    });
  }
  try {
    const r = await fetch(`${ASANA_BASE}/workspaces`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json(data.errors || { error: 'Asana API error' });
    }
    res.setHeader('Cache-Control', 'private, max-age=60');
    return res.status(200).json(data.data || []);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Failed to fetch workspaces' });
  }
};
