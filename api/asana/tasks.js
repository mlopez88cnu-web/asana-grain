/**
 * Asana API proxy: create tasks.
 * POST body: { workspaceGid, projectGid?, tasks: [{ name, notes? }] }
 * Requires env ASANA_ACCESS_TOKEN (Personal Access Token with tasks:write, projects:read).
 */
const ASANA_BASE = 'https://app.asana.com/api/1.0';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const token = process.env.ASANA_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'Server missing ASANA_ACCESS_TOKEN. Add it in Vercel (or .env) and redeploy.',
    });
  }
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  const { workspaceGid, projectGid, tasks } = body;
  if (!workspaceGid || !Array.isArray(tasks) || tasks.length === 0) {
    return res.status(400).json({
      error: 'Body must include workspaceGid and a non-empty tasks array.',
    });
  }
  const results = { created: [], errors: [] };
  for (const t of tasks) {
    const name = (t.name || '').trim();
    if (!name) {
      results.errors.push({ task: t, message: 'Task name is required' });
      continue;
    }
    const payload = {
      data: {
        name,
        workspace: workspaceGid,
        notes: (t.notes || '').trim() || undefined,
      },
    };
    if (projectGid) {
      payload.data.projects = [projectGid];
    }
    try {
      const r = await fetch(`${ASANA_BASE}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) {
        results.errors.push({
          task: t,
          message: (data.errors && data.errors[0] && data.errors[0].message) || r.statusText,
        });
        continue;
      }
      results.created.push({ name, gid: data.data && data.data.gid, permalink_url: data.data && data.data.permalink_url });
    } catch (e) {
      results.errors.push({ task: t, message: e.message || 'Request failed' });
    }
  }
  return res.status(200).json(results);
};
