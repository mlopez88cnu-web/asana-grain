## The Lopez Group LLC — Landing Page

Static landing page for The Lopez Group LLC (B2B demand gen + ABM).

### Grain → Asana tool

**[grain-to-asana.html](grain-to-asana.html)** — Paste Grain call transcripts and create Asana tasks from action items.

- **Local:** Open `grain-to-asana.html` in a browser. Workspace/project dropdowns and “Create tasks” need the app served from a host that can call your API (e.g. Vercel).
- **Vercel:** Set env var `ASANA_ACCESS_TOKEN` (Personal Access Token with `workspaces:read`, `projects:read`, `tasks:write`). The page uses `/api/asana/*` to list workspaces/projects and create tasks.
- **Local dev with API:** Run `npx vercel dev` in the project root and open the URL shown (e.g. http://localhost:3000/grain-to-asana.html). Add `ASANA_ACCESS_TOKEN` to `.env` for the API.

### Run locally

- Open `index.html` in your browser.

