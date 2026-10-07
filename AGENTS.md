# SiteCraft Portfolio — Agent Instructions

This is the website of **SiteCraft**, Saba's small web agency. It sells simple websites to small Georgian businesses (restaurants, salons, clinics, car repair shops). It is one long page, fully in Georgian.
Live address: **https://sitecraft-puce.vercel.app** (a free Vercel address). The code says the real address will be `sitecraft.ge`, but that domain is **not registered** yet (checked 2026-10-08).

**This file is shared by every AI agent.** Claude Code reads it through `CLAUDE.md`. Codex reads it directly. Keep tool-specific notes out of here.

**Shared rules for all projects:** `../../_shared/README.md`. Before social media, Codex, video or browser work, read the matching file in `../../_shared/playbooks/`. 🔒 Locks there can't be overridden here.

**The SiteCraft group:** this repo is one of 3 repos in `SiteCraft/`. The business picture and the open money decisions are in `../STATUS.md`. That file is not in any git repo; it syncs between Saba's 2 computers with Syncthing.

---

## Start of every session
1. Read `STATUS.md` (this repo) and `../STATUS.md` (the whole SiteCraft group).
2. Run `git status`. It should be clean, or match what `STATUS.md` says. On 2026-10-08 one untracked file was there: `.claude/settings.local.json`. Never commit it (see `STATUS.md`, problem 1).
3. Before you change any Georgian text, read `../../_shared/playbooks/georgian.md`. Claude never writes final Georgian alone.

## End of every session
1. Update `STATUS.md` (log + open problems + next steps).
2. Commit with the repo's commit style (see "Rules").
3. **Ask Saba before pushing code.** A push to `main` may publish the live site (see "Deploy" below). Docs-only pushes are fine.

## Where things live
| Path | What it is |
|---|---|
| `app/page.tsx` | The one page. It lists the sections in order: Header, Hero, Why a website, Pricing, Portfolio, Metrics, How it works, About, Contact, Footer. |
| `app/layout.tsx` | The page frame: title, description, link-preview tags (Open Graph = the tags Facebook and Messenger read to build a preview card), `metadataBase` (the base address used to build full links), the Georgian font (Noto Sans Georgian), and Vercel Analytics. |
| `app/globals.css` | Colors and theme (Tailwind CSS 4). |
| `components/` | One file per section. Examples: `pricing.tsx` (4 packages: from 250 / 350 / 500 / 800 GEL), `contact.tsx` (contact links and the form). |
| `components/ui/` | Small ready-made UI pieces from shadcn/ui (a set of React components you copy into the project): button, input, textarea. |
| `lib/lighthouse.ts` | Speed scores shown on the page. They come from a PageSpeed test on 2026-03-31. |
| `public/` | Icons, Saba's photo (`saba-portrait.webp`), and screenshots of past projects (`public/projects/`). |
| `BRIEF.md` | The original brief: audience, sections, prices, tone. Read it before you change what the page says. |
| `docs/v0-prompts.md` | The prompts used to design the page in v0.dev (Vercel's AI design tool). |
| `STATUS.md` | Current state, open problems, log. |

## How the contact form works
There is no server and no email sending. When a visitor sends the form, the page opens Facebook Messenger (`m.me/janela01`) in a new tab and copies the message to the clipboard. The visitor then pastes it into Messenger.
So this site does **not** need Resend (an email-sending service) today.

## Run, check, deploy
The package manager is **npm** (the repo has `package-lock.json`).
- `npm install`: run once per machine. Dependencies don't sync between the PC and the Mac.
- `npm run dev`: start a local copy at http://localhost:3000.
- `npm run build`: build the production version. Run it before you say a code task is done.
- `npm run start`: serve the built version.
- `npm run lint`: **broken today.** It runs `eslint .`, but ESLint (a code-checking tool) is not in `package.json`. Add it before you rely on lint.
- There are no tests.
- **Deploy:** Vercel project `sitecraft` (team "Janela's projects", free Hobby plan). Vercel builds from GitHub, branch `main`.
  - The last live deploy was commit `9631eeb` on 2026-03-31.
  - Vercel still names the source as `000Janela000/SiteCraft`. That is this repo's old name; GitHub forwards it to `SiteCraft2026/portfolio`. Nobody has checked yet whether a new push still starts a deploy. So treat every push to `main` as a possible live deploy.
  - Never run the `vercel` command from the repo root without naming the project (`--project sitecraft`). Always make a preview first. See "Deploy safety" in `../../_shared/standards/repo-conventions.md`.

## Rules
- **Commits:** one subject line in sentence case, with no type prefix, like the history. Example: `Fix portfolio link URL`. Past commits made with AI help end with a `Co-Authored-By:` line.
- **The page is Georgian only.** The audience is Georgian business owners. `BRIEF.md` says: no English on the page.
- **Mobile first.** Most visitors open the page on a phone, from a Facebook message.
- **Facts on the page must be true:** prices, phone, email, portfolio links. Check them before anything goes live (`../../_shared/playbooks/publish-gate.md`).
- **Facebook / Instagram:** SiteCraft's outreach runs through Saba's personal Facebook account. The 🔒 Meta rules in `../../_shared/playbooks/meta.md` apply. Example: no browser bot on Facebook while logged in.
- **This repo is public.** Never commit secrets or personal notes. Personal files go in a gitignored `private/` folder.
- **Plain, simple words** in all docs and notes.

## Overrides of the shared rules
None.
(The commit style above is this repo's old habit. `../../_shared/standards/repo-conventions.md` lets existing repos keep their habits.)
