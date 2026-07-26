# CLAUDE.md — Spotless360

> This file is auto-loaded at the start of every Claude Code session in this folder.
> It is the entry point for continuing work. Full details live in [PROJECT.md](PROJECT.md).

## What this is

Marketing website for **Spotless360**, Atlanta's experts for **air duct, dryer vent, chimney and
gutter cleaning & repair**. Static site — plain **HTML + CSS + vanilla JS**, no build step.

- **Live:** https://rickuzcategui138-hash.github.io/spotless360/
- **Repo:** https://github.com/rickuzcategui138-hash/spotless360 (public, GitHub Pages from `main`)
- **Deploy:** `git push` → Pages rebuilds automatically in ~1 min. Nothing else.

## Working rules (important)

- **All site content is in English** (client is in Atlanta, GA). Chat with the user in Spanish.
- Keep the brand: bright green `#16a637`, forest green `#2f5d1e`, gold `#c6a13a`; fonts **Poppins**
  (headings) + **Inter** (body). Logo: `assets/logo-spotless360.avif`.
- Phone: **(770) 755-3787** → `tel:+17707553787`; WhatsApp `https://wa.me/17707553787`.
- Use **relative links only** (site is served under `/spotless360/` on Pages — absolute `/paths` break).
- `styles.css` and `script.js` are **shared by every page** — a change applies site-wide.
- Every page needs: unique title/description/canonical, OG + Twitter tags, and JSON-LD.

## Local preview

```bash
python -m http.server 5501 --directory .
```
Open http://localhost:5501 . After edits, verify in the browser before pushing.

## Pages (all built & live)

- `index.html` — Home (hero + offer form, services, about teaser w/ video placeholder, testimonials, FAQ, contact)
- `services.html` — All services + services FAQ
- `air-duct-cleaning-repair.html`, `dryer-vent-cleaning-repair.html`,
  `chimney-cleaning-repair.html`, `gutter-cleaning-repair.html` — 4 service landing pages (same template)
- `about.html` — About
- `blog.html` — Blog index (featured post + "coming soon" cards)
- `how-often-clean-air-ducts-atlanta.html` — First full blog article (template for the rest)

## Status — done

Home, Services, About, Blog + 1 article, and all 4 service pages are built, SEO'd, mobile-verified
and deployed. Nav dropdown (desktop hover / mobile accordion), branded OG image, and cross-links all done.

## TODO / next steps (pick up here)

- [ ] `sitemap.xml` + `robots.txt` (10 pages now)
- [ ] Connect forms to a real destination (currently `action="#"` — Formspree / CRM / GoHighLevel)
- [ ] Write the 6 remaining "coming soon" blog articles
- [ ] Real photos (team, before/after) + About presentation video
- [ ] Optional: custom domain (spotless360.com)

## Note on memory

Cross-session "memory" is keyed to the folder path and does NOT follow this project reliably.
**Treat this CLAUDE.md + PROJECT.md as the source of truth** and update them as work progresses.
