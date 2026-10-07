# SiteCraft Portfolio — Status

> Read this at the start of every session. Update it at the end.
> Rule: if it matters next session, write it here. Never put secret values here; write only where they live.
> Last updated: **2026-10-08**

## Where we are
- **Live:** https://sitecraft-puce.vercel.app (answers 200, checked 2026-10-08). No own domain yet.
- **Stage:** live, but **dormant** (no work) since **2026-03-31**. Last commit: `9631eeb`.
- **Hosting / deploy:** Vercel project `sitecraft`, free Hobby plan. Vercel builds from GitHub, branch `main`. Last live deploy: `9631eeb` on 2026-03-31.
- **git status (2026-10-08):** clean, except one untracked file, `.claude/settings.local.json` (see problem 1).
- **The whole SiteCraft picture** (business, money decisions): `../STATUS.md`.

## Open problems (most important first)
1. **A plain-text npm token is on disk.** `.claude/settings.local.json` holds an `NPM_TOKEN` value in plain text (found 2026-10-08; the value was not copied anywhere).
   - It was never committed (checked in the git history).
   - But the file syncs to the Mac through Syncthing. It is **not** in `.gitignore`, and this repo is **public**. One careless `git add -A` would publish the token.
   - Fix: Saba revokes this npm token and makes a new one. Keep the new one in a user environment variable, not in a file. Then add `.claude/settings.local.json` to `.gitignore`. (Shared rule: `../../_shared/standards/repo-conventions.md`, section "Secrets".)
2. **The code points at a domain that doesn't exist.** `app/layout.tsx` sets `metadataBase` and `openGraph.url` to `https://sitecraft.ge`.
   - That domain is **not registered**: no DNS answer, and the .ge registry whois says "No match" (checked 2026-10-08).
   - The live page sends `og:url = https://sitecraft.ge`. So link-preview cards (Facebook, Messenger) and any full links built from `metadataBase` point to a dead site.
   - This matters because Saba sends this page in Facebook messages.
   - Fix after the name/domain decision in `../STATUS.md`: use the real domain. Until then, the `.vercel.app` address would be correct.
3. **Commercial use on a free plan.** Vercel Hobby is for non-commercial use only. This site sells web work, so it needs Vercel **Pro**, or another host. Saba's money decision (workspace plan D8).
4. **Vercel is linked to the old repo name.** Vercel lists the source as `000Janela000/SiteCraft`. GitHub forwards that name to `SiteCraft2026/portfolio` (same repo, id `1188239734`). But nobody has checked that a new push still starts a deploy. Check in Vercel → project `sitecraft` → Settings → Git (BROWSER). Reconnect it to `SiteCraft2026/portfolio` if needed.
5. **The phone link looks wrong.** In `components/contact.tsx`, the `tel:` link starts with `+599`. Georgia's country code is `+995`. The link also has 2 more digits than the number shown on the page. A visitor who taps it may call the wrong number. Saba: confirm the right number.
6. **No search basics.** `robots.txt` and `sitemap.xml` both give 404 (checked 2026-10-08). There is no canonical tag (the tag that tells Google the one true address of a page). See the setup list below.
7. **Lint is broken.** `npm run lint` runs `eslint .`, but ESLint is in neither `package.json` nor `package-lock.json`.
8. **Small things:**
   - The About section links to `https://saba-janelidze.vercel.app/`. That address now redirects (308, permanent) to `https://www.sabajanelidze.com/`. Link straight to the new address.
   - `@vercel/analytics` is in the code, but Web Analytics is off in the Vercel project (registry, checked 2026-10-07). So it collects nothing.

## Next steps
- **Saba (security, soon):** revoke and replace the npm token (problem 1).
- **Saba (decision):** keep the name "SiteCraft" and buy `sitecraft.ge`, or rebrand to a general name first. Details in `../STATUS.md`.
- **Saba (money):** Vercel Pro once SiteCraft earns money, or move the hosting.
- After those decisions: work through "Full setup" below.

## Waiting on someone outside
- Nothing.

## Full setup when this project becomes active
Do these in order. Markers: **AUTO** = an agent does it alone · **BROWSER** = an agent in the Playwright browser after Saba logs in · **HUMAN** = Saba.
Checklists: `../../_shared/standards/new-domain.md` and `../../_shared/standards/web-basics.md`. The skill `/domain-setup <domain>` walks through steps 4–15.

1. **HUMAN: decide the name and the domain.**
   - Keep "SiteCraft" → buy `sitecraft.ge` at a Georgian (.ge) registrar.
   - Or pick a new general name first, then buy its domain (`.com` and similar: at Cloudflare, at cost).
   - Note the auto-renew choice in `../../_shared/registry/domains.md`.
2. **HUMAN: Vercel Pro**, because the site is commercial (`../../_shared/standards/web-basics.md`, "Rules").
3. **BROWSER: fix the Vercel Git link** to `SiteCraft2026/portfolio` (problem 4).
4. **HUMAN + AUTO: Cloudflare DNS.** Saba points the domain's nameservers to Cloudflare at the registrar (HUMAN). After that, the agent manages the DNS records (AUTO).
5. **BROWSER + AUTO: connect the domain in Vercel.**
   - Add the domain on the project's Domains page (BROWSER). Vercel recommends redirecting the bare domain to `www`.
   - Add the CNAME records Vercel shows, **DNS-only (grey cloud)** (AUTO).
   - Redirect `sitecraft-puce.vercel.app` to the new domain. Otherwise the 2 addresses compete in Google (lesson from sabajanelidze.com).
6. **AUTO: keep search crawlers allowed.** Never turn on Cloudflare's "Block AI training" on proxied hostnames; it also blocks Googlebot.
7. **AUTO: email in.** Cloudflare Email Routing: `hello@<domain>` + catch-all → Saba's inbox. Check the existing MX records first. Then replace Saba's Gmail on the page with `hello@<domain>` (`../../_shared/standards/email.md`).
8. **BROWSER: DMARC** (a rule that tells other mail servers what to do with fake mail from this domain). Cloudflare → the zone → Email → DMARC Management → Enable. Start at `p=none`.
9. **Skip Resend for now.** The contact form opens Messenger and sends no email. Add Resend only if the form starts sending email (`../../_shared/standards/email.md`, "Sending"). If the domain never sends mail, use SPF `v=spf1 -all` and DMARC `p=reject` instead.
10. **AUTO (code change): site basics.**
    - Set `metadataBase` and `openGraph.url` to the final domain.
    - Add `app/robots.ts`, `app/sitemap.ts`, a canonical tag (`alternates.canonical`), a link-preview image (`og:image`) and a real 404 page.
    - Fix the phone link (problem 5) and the About link (problem 8).
    - Any text change goes through the Georgian chain and the publish gate (`../../_shared/playbooks/georgian.md`, `../../_shared/playbooks/publish-gate.md`).
11. **BROWSER + AUTO: analytics.** Cloudflare Web Analytics → Add a site → the hostname. The site runs on Vercel (DNS-only), so pick the manual JS snippet and paste it into `app/layout.tsx`. Then remove the unused `@vercel/analytics` (`../../_shared/standards/new-domain.md`, step 9).
12. **BROWSER: Sentry** (a service that records errors on the live site). Run `npx @sentry/wizard@latest -i nextjs`; it opens a browser login. Set `tunnelRoute`. Put `SENTRY_AUTH_TOKEN` in Vercel's env. One Sentry project for this site (`../../_shared/standards/web-basics.md`, "Sentry set-up per stack").
13. **AUTO + BROWSER: Google Search Console**, with `node ../../_shared/tools/google.mjs`:
    1. `verify-token <domain>`, then add that TXT record at the domain root in Cloudflare. Keep the record forever.
    2. `verify <domain>`
    3. `add-owner <domain> ssjanelidze@gmail.com`
    4. `sc-add <domain>`
    5. `sitemap <domain> https://<domain>/sitemap.xml`
    6. BROWSER: open `https://search.google.com/search-console?resource_id=sc-domain%3A<domain>` as Saba and click **"Verify your ownership"** once.
    7. BROWSER: type the home page into "Inspect any URL", click **"Request indexing"**, and wait for "Indexing requested".
14. **AUTO: speed baseline.** `node ../../_shared/tools/google.mjs psi https://<domain>/` (mobile, 3 runs, median). Save the scores in this file. If the page keeps showing scores, update `lib/lighthouse.ts` too (its numbers are from 2026-03-31).
15. **AUTO: GitHub homepage link** → the new domain: `gh repo edit SiteCraft2026/portfolio --homepage https://<domain>`. Today it points to `https://sitecraft-puce.vercel.app`, which is right for now.
16. **AUTO, 3–7 days later:** check the sitemap status and whether the home page is indexed. Then update `../../_shared/registry/domains.md`, `../../_shared/registry/projects.md` and this file.

Not needed now:
- An uptime monitor. Sentry gives only 1 free monitor for the whole workspace, and it belongs to a more important site.
- A Google Business Profile. SiteCraft has no physical place.

## Log (newest first)
- **2026-10-08:** light setup (agent docs) added: `AGENTS.md`, `CLAUDE.md`, `STATUS.md`. Checked the same day: the live site answers 200; `og:url` is `sitecraft.ge` (not registered); robots.txt and sitemap.xml give 404; Vercel's source is still the old repo name; a plain-text npm token sits in `.claude/settings.local.json` (not committed).
- **2026-03-31:** last code work: About section redesign, real contact details, real project screenshots, a Lighthouse scores section. Live deploy `9631eeb`.
- **2026-03-22:** first commit: the landing page, built from `BRIEF.md` with v0.dev.
