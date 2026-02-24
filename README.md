# Grain → Asana

Turn Grain call transcripts into Asana tasks. Paste a transcript, parse action items, then create tasks in your Asana workspace.

### Deploy (Vercel)

1. Set env var **`ASANA_ACCESS_TOKEN`** (Asana [Personal Access Token](https://app.asana.com/0/developer-console) with `workspaces:read`, `projects:read`, `tasks:write`).
2. Deploy. The app is at `/` and `/grain-to-asana.html`.

### Local dev

- **API + app:** Run `npx vercel dev`, then open the URL shown (e.g. http://localhost:3000). Add `ASANA_ACCESS_TOKEN` to `.env`.
- **App only:** Open `grain-to-asana.html` in a browser (workspace/project and “Create tasks” need the deployed API).
