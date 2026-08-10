# Spotless360 — Project Documentation

Marketing website for **Spotless360**, Atlanta's trusted experts for **air duct, dryer vent,
chimney and gutter cleaning & repair**.

- **Live site:** https://rickuzcategui138-hash.github.io/spotless360/
- **Repository:** https://github.com/rickuzcategui138-hash/spotless360 (public)
- **Hosting:** GitHub Pages (auto-deploys from `main`, ~1 min after each push)

---

## 1. Tech stack

Static site — plain **HTML, CSS and vanilla JavaScript**. No framework, no build step.

- `styles.css` — single shared stylesheet (design tokens + all components)
- `script.js` — shared JS. Injects (so they're identical on every page): the **mobile bottom
  tab bar**, the **slide-up menu sheet**, the **header Call+Schedule CTAs**, and the **home promo
  modal**. Also handles the services dropdown and dynamic year.
- Fonts: **Poppins** (headings/UI) + **Inter** (body), loaded from Google Fonts
- Icons: inline SVG (no icon library)

---

## 2. Brand

| Token | Value |
|-------|-------|
| Bright green (CTAs) | `#16a637` |
| Forest green (top bar / accents) | `#2f5d1e` |
| Gold accent | `#c6a13a` |
| WhatsApp green | `#25d366` |
| Headings font | Poppins (600–800) |
| Body font | Inter (400–600) |
| Logo | `assets/logo-spotless360.avif` |

**Contact**

- Phone / tel: **+1 (470) 660-4517** → `tel:+14706604517`
- WhatsApp: `https://wa.me/14706604517` (most links include a prefilled `?text=` message)
- Service area: Atlanta, GA & metro area
- Hours: Mon–Sat, 8:00 AM – 7:00 PM

---

## 3. Services

1. Air Duct Cleaning & Repair
2. Dryer Vent Cleaning & Repair
3. Chimney Cleaning & Repair
4. Gutter Cleaning & Repair

---

## 4. Pages

| Page | File | Notes |
|------|------|-------|
| Home | `index.html` | Hero (**photo background** + offer form), services, About (**real team photo**), **"Our Work" gallery** (3 photos), testimonials, FAQ, contact. Shows the **promo modal** 5 s after load. |
| All Services | `services.html` | 4 service sections + services FAQ; each card links to its full page |
| Air Duct | `air-duct-cleaning-repair.html` | Full service landing page — hero has a **photo background** (`hero--photo` modifier) |
| Dryer Vent | `dryer-vent-cleaning-repair.html` | Full service landing page |
| Chimney | `chimney-cleaning-repair.html` | Full service landing page |
| Gutter | `gutter-cleaning-repair.html` | Full service landing page |
| About | `about.html` | Story, values, promise, service area, video placeholder |
| Blog index | `blog.html` | Featured post + "coming soon" cards |
| Blog article | `how-often-clean-air-ducts-atlanta.html` | First full article (template) |

Each **service page** follows one template: hero + inline quote form → trust strip → benefits →
5-step process → what's-included / signs-you-need-it → testimonials → service FAQ → contact → footer.

---

## 5. Shared components & conventions

- **Header** — sticky, with logo, a **Services mega-dropdown** (hover on desktop, tap-accordion
  on mobile) and a WhatsApp CTA. On **desktop** the full nav shows. On **mobile** the top hamburger
  is hidden; instead the header shows two injected CTAs — **Call** (green) + **Schedule** (forest
  green) — and navigation moves to the bottom bar + slide-up sheet (below).
- **Mobile bottom tab bar** (`.bottom-nav`, ≤720px) — app-style fixed bar: **Home · Services ·
  Call (elevated green) · Book · More**. Marks the active tab by page. Injected by `script.js`.
- **Slide-up menu sheet** (`.sheet`, opened by the "More" tab) — bottom sheet with a drag handle,
  Home/About/Blog/Schedule links, a Services list and a big Call button. Closes via ✕, backdrop,
  Escape, swipe-down, or tapping a link.
- **Promo modal** (`.promo`, home only) — "Schedule Your Inspection Online" popup that appears
  **5 s after load, once per session** (`sessionStorage`). Primary CTA → `#quote`, secondary → call.
- **Photo hero modifier** (`.hero--photo`) — reusable: dark image background + white text. Used on
  the home hero and the Air Duct hero (both use `assets/airduct-residential.jpg`). Add the class to
  a `.hero`/`.svc-hero` section to give it a photo background.
- **"Our Work" gallery** (`.gallery`) — responsive photo grid (3 → 2 → 1 columns).
- **Footer** — brand blurb, Services / Company / Get in Touch columns.
- **Floating WhatsApp** button on every page (sits above the bottom bar on mobile).
- **Forms** are currently front-end only (`action="#"`) — see TODO to connect them.
- Navigation is fully cross-linked with **relative paths** (required for the `/spotless360/` Pages base).

### Assets

- `assets/logo-spotless360.avif` — horizontal logo lockup used in the header/footer.
- `assets/logo-stacked.png` — new stacked gold+green logo (icon over wordmark). Available for a
  favicon / social image; not yet wired in.
- `assets/og-image.png` — 1200×630 branded social-share card (PNG, because WhatsApp/Facebook/X
  don't render AVIF previews). Referenced by all Open Graph / Twitter tags.
- **Real photos** (optimized JPEGs, ~50–355 KB): `airduct-residential.jpg` (home + Air Duct hero
  backgrounds and the gallery), `team-in-home.jpg` (home About), `tech-van.jpg` and
  `commercial-kitchen.jpg` (gallery), `van-white.jpg` (branded van, currently unused). Source PNGs
  were resized to ≤1400px and re-encoded to JPEG q82 via `System.Drawing`.

---

## 6. SEO

Every page includes:

- Unique `<title>`, meta description and `<link rel="canonical">`
- Open Graph + Twitter Card tags (shared OG image)
- **JSON-LD structured data**, validated:
  - Home → `HomeAndConstructionBusiness`
  - Services → `BreadcrumbList`, `Service` ItemList, `FAQPage`
  - Each service page → `BreadcrumbList`, `Service`, `FAQPage`
  - About → `BreadcrumbList`, `AboutPage`
  - Blog → `BreadcrumbList`
  - Article → `BreadcrumbList`, `BlogPosting`

---

## 7. Run locally

Any static server works. For example:

```bash
python -m http.server 5501 --directory spotless360
```

Then open http://localhost:5501

---

## 8. Deployment

GitHub Pages serves the `main` branch root. To publish changes:

```bash
git add -A
git commit -m "your message"
git push
```

The site rebuilds automatically (~1 minute). No other steps.

---

## 9. TODO / next steps

- [ ] `sitemap.xml` + `robots.txt` (9 pages — helps Google index everything)
- [ ] Connect the forms to a real destination (Formspree / CRM / GoHighLevel)
- [ ] Write the 6 remaining "coming soon" blog articles
- [ ] Add photos to the Dryer Vent / Chimney / Gutter hero backgrounds (need service-specific photos)
- [ ] Wire `logo-stacked.png` as the favicon + regenerate the OG image from the new logo
- [ ] Decide on `reviewCount` in JSON-LD (still `127`; "homes served" copy is now `1249+`)
- [ ] Replace the **About page** video placeholder (about.html) with a real photo/video
- [ ] Optional: custom domain (e.g. spotless360.com / spotless360ga.com)

---

## 10. Change log

### 2026-08-10 — Mobile UX, contact info & real photos
- **Mobile navigation redesign:** added an app-style **bottom tab bar** (Home/Services/Call/Book/More),
  replaced the top hamburger with a **slide-up menu sheet**, and added **Call + Schedule** CTAs in the
  mobile header.
- **Contact info updated site-wide:** phone → **(470) 660-4517** (`tel:+14706604517`,
  `wa.me/14706604517`, JSON-LD, all display text); "homes served" counter **127+ → 1249+**.
- **Home promo modal:** "Schedule Your Inspection Online" popup, 5 s after load, once per session.
- **Real photos integrated & optimized:** home hero photo background, home About photo, home
  "Our Work" gallery (3 photos), and the Air Duct hero photo background (`hero--photo` modifier).
  Images optimized to JPEG (~50–355 KB). New `logo-stacked.png` added to `assets/`.

_Last updated: 2026-08-10_
