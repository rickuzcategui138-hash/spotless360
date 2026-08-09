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
- `script.js` — shared JS (mobile nav toggle, services dropdown, dynamic year)
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
| Home | `index.html` | Hero + new-customer offer form, services, about teaser (video placeholder), testimonials, FAQ, contact |
| All Services | `services.html` | 4 service sections + services FAQ; each card links to its full page |
| Air Duct | `air-duct-cleaning-repair.html` | Full service landing page |
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

- **Header** — sticky, with logo, nav, a **Services mega-dropdown** (hover on desktop, tap-accordion
  on mobile), a WhatsApp CTA, and a hamburger that morphs into an X on mobile.
- **Footer** — brand blurb, Services / Company / Get in Touch columns.
- **Floating WhatsApp** button on every page.
- **Forms** are currently front-end only (`action="#"`) — see TODO to connect them.
- Navigation is fully cross-linked with **relative paths** (required for the `/spotless360/` Pages base).

### Asset

- `assets/og-image.png` — 1200×630 branded social-share card (PNG, because WhatsApp/Facebook/X
  don't render AVIF previews). Generated from the logo; referenced by all Open Graph / Twitter tags.

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

- [ ] `sitemap.xml` + `robots.txt` (now 10 pages — helps Google index everything)
- [ ] Connect the forms to a real destination (Formspree / CRM / GoHighLevel)
- [ ] Write the 6 remaining "coming soon" blog articles
- [ ] Add real photos (team, before/after) to replace logo placeholders and the About video placeholder
- [ ] Optional: custom domain (e.g. spotless360.com)

---

_Last updated: 2026-07-26_
