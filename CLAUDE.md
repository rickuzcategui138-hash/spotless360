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
- Custom circular **badge icons**: `icon-airduct.png`, `icon-dryer.png`, `icon-chimney.png`,
  `icon-gutter.png`, `icon-airflow.png` (see 2026-08-17 — were embedded-raster SVGs). Same icons on services.html heads
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
- Badge "Insured + Qualified Technicians You Can Count On". Copyright "© 2026 Spotless360. All
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

## Session changes — 2026-08-17 (icons + insurance wording)

**Header dropdown icons**
- The Services dropdown used generic inline SVG glyphs; now uses the real circular badge icons
  (`.dropdown__ico--badge` added to `styles.css` to drop the green tinted square). All 9 pages.
- **No `loading="lazy"` on these** — the dropdown is `visibility:hidden` until hover, so lazy images
  never start downloading and the icons render blank on first open.

**Insurance wording (no license is claimed anywhere anymore)**
- about.html values card: "Licensed & Insured" → **"Fully Insured"** / "Properly insured for your
  protection and peace of mind on every job."
- Footer badge (9 pages): "Licensed + …" → **"Insured + Qualified Technicians You Can Count On"**
  (matches the header trust strip).
- services.html FAQ: "Are your technicians licensed and insured?" → **"Are your technicians insured?"**;
  answer "licensed, bonded and insured" → **"fully insured"**. Changed in **both** the visible
  `<details>` and the **FAQPage JSON-LD** — they duplicate the copy, so both must move together.
- Verified: zero case-insensitive matches for `licens` across `*.html` + `script.js`.

**about.html "What Makes Spotless360 Different" — new icons**
- Source `Ricardo/Icons/Icons 2/Icon 11|22|33|44.svg` → `icon-insured.png`, `icon-vetted.png`,
  `icon-pricing.png`, `icon-guarantee.png` (order in the sprite matches the card order).

**Icon weight — all icons are now 160×160 PNGs (~40 KB each)**
- The supplied SVGs each embedded a full raster sprite: the 4 new ones were **1.4 MB each** (all four
  embedded the *same* 1774×887 sheet, cropped via the `<pattern>` transform); the 5 service ones were
  ~193 KB each and embedded **JPEG**, not PNG — worth remembering when parsing them.
- Recipe (no node/python here — PowerShell `System.Drawing`): parse `transform="translate(tx ty)
  scale(s)"`, crop a `1/s` square at `(-tx/s, -ty/s)` from the embedded raster, draw into a 160×160
  bitmap with an ellipse clip so the corners are transparent, save PNG.
- `icon-airduct|dryer|chimney|gutter|airflow.svg` **deleted**; every reference now `.png`.
- Total icon payload **880 KB → 196 KB** (78% less); the header dropdown alone went ~790 KB → ~155 KB.
- Display size is 62px max (`.card__icon` / `.svc__ico`), so 160px covers retina.

**about.html "Proudly Serving Georgia" (service area)**
- Chip list went from 8 hand-picked cities to **all 60** + the statewide "Georgia" chip, generated
  from the footer's `.footer__cities` string so the two lists cannot drift.
- Section container changed `container container--narrow` (800px) → **`container`** (1180px) so the
  chips run wide instead of tall: 11 rows/546px → **7 rows/344px** at 1440px viewport. The heading
  is unaffected — `.section__head` has its own 640px cap.
- **Mobile still stacks to ~1590px tall** (26 rows at 375px). Left as-is; if it needs compacting,
  shrink the chip font/padding under 560px or truncate with a "show all" toggle.

**Hero eyebrow + Our Promise icon**
- `index.html` hero eyebrow: "🥇 Ask About Our First-Time Customer Special Offers!" →
  **"BEYOND CLEAN, SPOTLESS 360."** Uppercased in the markup itself (not `text-transform`) so screen
  readers and copy/paste get the caps too. The medal emoji was dropped with the offer wording.
  Still inherits the promo-orange `#ff9d5c` from `.hero--photo .hero__eyebrow` (styles.css:906) —
  revisit if a brand tagline wants a different colour.
- `about.html` "Our Promise" head icon → **`icon-promise.png`** (house + check in a hand), from
  `Icons 2/Icon 55.svg`. That one is a **single 1254×1254 image, not a sprite** — same crop recipe,
  2028 KB → 31.7 KB. Uses the existing `.svc__ico--badge`.
- **Still on the old flat green glyphs:** the `.svc__ico` head on the 4 service pages
  (`air-duct|dryer-vent|chimney|gutter-cleaning-repair.html`, line ~278). The matching branded PNGs
  already exist — swap them for consistency when convenient.

**Home pricing section (`#pricing`, index.html between Services and About)**
- Three `.price-card`s: Essential Vent & Duct Cleaning **$249** (Most Popular), Dryer Vent & Airflow
  Service **$89**, Air Duct + Dryer Vent Bundle **$299** (Best Value). CTAs anchor to `#quote`.
- Names/prices/badges are **deliberately identical to the `script.js buildOfferPackages` radio
  options** — if a price changes it must change in BOTH places or the site contradicts itself.
- New CSS block at the end of `styles.css`. Cards are flex columns with `.price-card__list { flex:1 }`
  so all three stay equal height despite 7/6/5 bullets. Stacks to one 460px-max column under 900px.
- Copy came from the user verbatim except a typo fix: "organic dodorizer" → **deodorizer**.
- **No fine print yet.** The reference screenshot had disclaimers (per-HVAC-unit pricing, dryer-vent
  footage limits); those are commercial terms and were NOT invented. Add them under the grid when
  the client supplies the wording.
- No "Prices" nav link was added.

## TODO / next steps

- [ ] **Pricing fine print** — `#pricing` on the home publishes $249/$89/$299 with no conditions.
      Get the per-HVAC-unit / dryer-vent-footage disclaimers from the client and add them.
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
