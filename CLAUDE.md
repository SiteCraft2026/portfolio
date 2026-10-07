@AGENTS.md

# Claude Code — extra notes

The shared rules are in `AGENTS.md` (imported above). This part is only for Claude Code.

- **Permissions:** `.claude/settings.json` (committed) lets Claude run any shell command and edit files without asking. So be careful: ask Saba before deleting files, pushing, or changing anything on Vercel.
- **Local settings:** `.claude/settings.local.json` is this machine's own file. It is untracked and **not** gitignored, and it holds a token. Never `git add` it, and never use `git add -A` / `git add .` in this repo. Add files by name.
- **Browser:** Playwright uses the `sitecraft` profile when Claude starts in any SiteCraft repo (see `../../_shared/playbooks/browser.md`). When a site asks for a login, stop and ask Saba to log in in that window.
- **Vercel:** the Vercel MCP (a connector that lets Claude read Vercel) is read-only. It can read the `sitecraft` project, its deploys and logs. Project changes give 403 (forbidden), so do them in the Vercel dashboard (BROWSER).
- **MCP servers and skills:** this repo has no `.mcp.json` and no `.claude/skills/`. Useful shared skills: `/domain-setup <domain>`, `/project-setup`, `/workspace-audit`, `/ask-codex`.
- **Georgian text:** use the Georgian chain in `../../_shared/playbooks/georgian.md` (a Fable 5.1 subagent or Gemini writes the Georgian; Claude checks the meaning).
