# CLAUDE.md — Spotless360

> Auto-loaded at the start of every Claude Code session in this folder. Entry point for
> continuing work. Full history in [PROJECT.md](PROJECT.md).

## What this is

Marketing website for **Spotless360**, Georgia's experts for **air duct, dryer vent, chimney and
gutter cleaning & maintenance**. Static site — plain **HTML + CSS + vanilla JS**, no build step.

- **Live:** https://rickuzcategui138-hash.github.io/spotless360/
- **Repo:** https://github.com/rickuzcategui138-hash/spotless360 (public, GitHub Pages from `main`)
- **Local path:** `C:\Users\Rick\Documents\Proyectos\Ricardo\spotless360`
- **Deploy:** `git push` → Pages rebuilds automatically in ~1 min. Nothing else.

## Working rules (important)

- **All site content is in English.** Chat with the user in **Spanish**.
- **Positioning is "Georgia"** (statewide), not "Atlanta" — site-wide in visible text. Service naming
  is **"Cleaning & Maintenance"**, NOT "Repair" — there must be **no visible "repair"** anywhere.
- Brand: bright green `#16a637`, forest green `#2f5d1e`, gold `#c6a13a`; fonts **Poppins**
  (headings) + **Inter** (body). Header logo: `assets/logo-spotless360.avif`; footer logo:
  `assets/logo-stacked.png`.
- Phone: **(470) 660-4517** → `tel:+14706604517`; WhatsApp `https://wa.me/14706604517`.
- Hours: **Mon–Sat, 7:00 AM – 7:00 PM**.
- Use **relative links only** (served under `/spotless360/` on Pages — absolute `/paths` break).
- `styles.css` and `script.js` are **shared by every page** — a change applies site-wide.
- **Filenames/URLs keep "-repair.html"** (e.g. `air-duct-cleaning-repair.html`) and the article keeps
  "atlanta" in its filename — renaming would break live links/SEO. Only the visible text changed.
  So case-sensitive/phrase-based replaces that avoid `.html` URLs are the safe pattern.

## Environment / tooling notes

- **python and node are NOT installed** (Windows Store stub only). For a local preview, run a static
  file server another way — e.g. a PowerShell `System.Net.HttpListener` server on port 8080, then open
  `http://localhost:8080`. Verify in the browser before pushing.
- Git identity is set locally (`rickuzcategui138-hash` + GitHub no-reply email). `gh` CLI is installed.
- **git commit gotcha:** PowerShell here-strings with quotes break `git commit -m`. Write the message
  to a temp file and use `git commit -F <file>`.
- The in-app Browser pane sometimes desyncs scroll from screenshots — verify layout with JS
  `getBoundingClientRect()` measurements when a screenshot won't land.

## Pages

- `index.html` — Home (hero + offer form w/ package selector, 5 service cards, About w/ photo,
  "Our Work" gallery, testimonials, FAQ, contact; promo modal **7 s** after load, once/session)
- `services.html` — 4 service sections (rewritten copy) + services FAQ
- `air-duct-cleaning-repair.html`, `dryer-vent-cleaning-repair.html`,
  `chimney-cleaning-repair.html`, `gutter-cleaning-repair.html` — 4 service landing pages
- `about.html`, `blog.html`, `how-often-clean-air-ducts-atlanta.html` (first blog article)

## Session changes — 2026-08-16/17 (all deployed)

**Location & naming**
- Atlanta → **Georgia** site-wide (visible text). EXCEPTIONS kept on purpose: the **same-day-service
  FAQ answers say "metro Atlanta"**; filenames/URLs keep `-repair.html` + the article's `-atlanta`.
- **Repair → Maintenance** site-wide (titles, meta, nav, footer, cards, copy, FAQ, JSON-LD, and the
  `script.js` mobile menu). Grammar reworded (service/seal/results/problems/breakdowns).
- JSON-LD `areaServed` on business/service schemas = **60 metro-Atlanta cities**;
  `addressLocality` = "Georgia"; offer-form City default = "Georgia".
- Fixed a pre-existing **mojibake em-dash** in several `<title>`/`og:title`/description/image-alt.

**Home (index.html)**
- Offer/booking forms get a JS-injected (`script.js buildOfferPackages`) **required package selector**:
  🏷️Most Popular Essential Vent & Duct Cleaning **$249**, Dryer Vent & Airflow **$89**, 🏷️Best Value
  Air Duct + Dryer Vent Bundle **$299**; then an animated **"Other services"** block (Gutter/Chimney,
  quote-on-site) + an "Insured + Qualified Technicians" assurance badge. Injected into booking forms
  only (those with an address field); short "Request a Callback" forms untouched.
- 5 service cards (added **Airflow Test & AC Mold Inspection**), grid laid out **2 top / 3 bottom**
  (`cards--split`). Cards link to their service pages ("Learn more →"); Airflow → `#quote` (no page).
- Custom circular **badge icons**: `icon-airduct.svg`, `icon-dryer.svg`, `icon-chimney.svg`,
  `icon-gutter.svg`, `icon-airflow.svg` (embedded-raster SVGs). Same icons on services.html heads
  (`.svc__ico--badge` / `.card__icon--badge` remove the old green square).
- About: new photo `assets/about-team.jpg`; desktop photo height matches the text column
  (`@media (min-width:961px)` absolute-fill), mobile capped 340px. Stat "5.0 Google rating" →
  **"100% Satisfaction Guaranteed"** (also on about.html).
- "Our Work" gallery: `gallery-duct.jpg` (pos 1), `gallery-kitchen.jpg` (pos 3); van unchanged.
- Testimonials: "What Our Clients Are Saying" (dropped "Testimonials" label) + colored Google wordmark.
- Copy: services intro "systems"→"services"; chimney "remove"→"prevent creosote"; air-duct FAQ
  frequency **1–2 years**; About 2nd paragraph rewritten; gallery intro "kitchens"→"spaces".
- Promo modal now fires at **7 s** with a softer 0.8 s fade-in.

**Header / top bar**
- Trust strip (3 items): 🛡 Insured & Qualified Technicians · ⚡ Same-Day Service Available Upon
  Request · 💰 100% Satisfaction Guaranteed.
- Top **marquee scrolls right→left** (`topbar-scroll` 0 → -50%). Mobile: slower (44 s), tighter left
  padding (0.9rem), starts on "Insured". Hover-pause gated to `@media (hover:hover)` (touch fix).

**Footer (responsive)**
- Logo `logo-stacked.png` (green "360", white bg) with `border-radius:16px`.
- Tagline **"GEORGIA'S NEW STANDARD FOR PROPERTY CARE."** (uppercased via CSS).
- Badge "Licensed + Qualified Technicians You Can Count On". Copyright "© 2026 Spotless360. All
  rights reserved." Contact card "Proudly Serving Georgia". Hours 7 AM–7 PM.
- **"Where We Serve"** section (`.footer__areas`) listing the 60 cities + note.
- **Desktop:** 4 columns (brand · Services · Company · Get in Touch) + Where We Serve.
- **Mobile (≤560):** logo centered/bigger (150px), tagline top-aligned with Services (2 cols),
  Company + Get in Touch hidden, and a centered Hours + phone + WhatsApp block (`.footer__contact`,
  mobile-only).

**services.html**
- All 4 service sections rewritten (expanded "Our … Services" lists + "Signs You Need It" +
  "services vary" notes). Eyebrows now just **"Service"** (no 01–04 numbering).

**Social preview**
- OG image is **`assets/og-logo-white.png`** (footer logo centered on a white 1200×630 canvas),
  referenced by `og:image`/`twitter:image` on all pages. (Old `og-image.png` / `og-logo.png` unused.)

## TODO / next steps

- [ ] **Connect forms to a real destination** — still `action="#"` (now with the package selector).
- [ ] **Airflow Test & AC Mold Inspection** has no dedicated page (home card → `#quote`). Build one, or
      point it to `services.html`.
- [ ] `index.html` canonical/JSON-LD `url` point to **`https://spotless360.com/`** but the live site is
      github.io — align these (custom domain, or switch canonical to the Pages URL).
- [ ] Decide whether to rename `-repair.html` files to `-maintenance.html` (needs redirects) or leave.
- [ ] `sitemap.xml` + `robots.txt`.
- [ ] JSON-LD `reviewCount` still `127`; "homes served" copy is `1249+`.
- [ ] Write remaining "coming soon" blog articles; per-service hero photos for Dryer/Chimney/Gutter.
- [ ] Favicon from the new logo.

## Note on memory

Cross-session "memory" is keyed to the folder path and does NOT follow this project reliably.
**Treat this CLAUDE.md + PROJECT.md as the source of truth** and update them as work progresses.
