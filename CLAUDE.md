# CLAUDE.md — Spotless360

> Auto-loaded at the start of every Claude Code session in this folder. Entry point for
> continuing work. Full history in [PROJECT.md](PROJECT.md).

## What this is

Marketing website for **Spotless360**, Georgia's experts for **air duct, dryer vent, chimney and
gutter cleaning & maintenance**. Static site — plain **HTML + CSS + vanilla JS**, no build step.

- **Live:** https://spotless360ga.com (Namecheap cPanel shared hosting, docroot `/public_html`)
- **Repo:** https://github.com/rickuzcategui138-hash/spotless360 — source only, NOT the deploy path
- **Local path:** `C:\Users\Rick\Documents\Proyectos\Ricardo\spotless360`
- **Deploy:** run the `deploy.ps1` script (FTPS). `git push` publishes NOTHING now. GitHub Pages
  served the site until 2026-08-19 and should be turned off (Settings → Pages → Source: None) so
  it stops competing with the domain.

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

**Home pricing section — BUILT, THEN REMOVED**
- A `#pricing` section with three package cards ($249 / $89 / $299) was added and deployed in
  commit `dd98599`, then removed at the user's request right after. `index.html` and `styles.css`
  are back to being byte-identical to their `ba9c91c` state.
- If it is ever wanted back, the full markup + CSS is in `git show dd98599 -- index.html styles.css`.
  Note the prices there duplicated `script.js buildOfferPackages`, which is still the only place
  package prices live.

**Package tooltips in the booking form (`script.js buildOfferPackages`)**
- Each of the three package rows now carries a `?` info dot (`.pkg-info`) whose `.pkg-tip` panel lists
  what the package includes on hover. Built by the `tip(label, items)` helper — edit the arrays there,
  they are the only copy of these lists now that the `#pricing` section is gone.
- Counts: Essential **8**, Dryer Vent & Airflow **7**, Bundle **5**.
- **The dot sits inside the `<label>`**, so its click handler calls `preventDefault` +
  `stopPropagation` — without it, clicking the dot ticks that package's radio.
- Hover alone would hide this on touch, so the click also toggles `.is-open` (one at a time), with
  Enter/Space to open and Escape to close for keyboards.
- `.pkg-tip` is positioned against `.pkg-option` (`left:12px; right:12px`), NOT against the dot —
  that keeps it inside the card whatever the package name length. `.pkg-option:first-of-type` flips
  its tip below, since there is no room above inside the form.
- **Verifying this in the Browser pane:** the pane does not composite frames, so CSS transitions
  freeze at their start value and `opacity` reads 0 even when the rule applied. Set
  `el.style.transition='none'` before measuring, or you will chase a bug that isn't there.
- **Dismissal (added right after):** outside click, Escape and scroll all close an open tip, via
  document-level listeners registered once at the end of the IIFE.
- **`pointer-events` gotcha:** the base `.pkg-tip` sets `pointer-events: none`, and the `.is-open`
  rule originally did not undo it — the panel looked solid but taps passed straight through it and
  hit the controls underneath (a user tapped to dismiss and ticked the Chimney add-on instead).
  `.pkg-info.is-open .pkg-tip { pointer-events: auto; }` fixes it (folded into the show rule once the
  panel became click-only).
- **Click-only (changed after first release):** hover no longer opens the panel — it only restyles the
  dot. Showing is driven by `.is-open` (click/tap) and `:focus-visible` (keyboard). `cursor` went
  `help` → `pointer`, and the dot carries `aria-expanded`, kept in sync by the `setTipOpen()` /
  `closeAllTips()` helpers — every open/close path goes through them so class and aria can't drift.
- **Dot styling:** at 16px a border-colour change was invisible, so hover/open flips the whole dot to
  a filled `--green-dark` circle with a white glyph, `scale(1.18)` and a soft ring. The scale is a
  `transform`, so the 57px option row does not shift. `prefers-reduced-motion` drops the transition.


## Session changes — 2026-08-19 (moved to real hosting + carousel + video reviews)

**Hosting migration — spotless360ga.com**
- `spotless360.com` is a DIFFERENT company (a mobile-detailing WordPress in Hawaii). The home page
  used to declare it as `canonical`, handing its ranking signals to that unrelated site. Fixed.
- All **65 absolute self-URLs** across the 9 pages now point at `https://spotless360ga.com/`
  (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`image`). The `/spotless360/`
  path segment from Pages is gone — the site is served from the domain root.
- Added **`robots.txt`** and **`sitemap.xml`** (9 URLs, home 1.0 → services 0.9 → blog 0.5).
- SSL: Namecheap issued `CN=spotless360ga.com` (SSL.com) and HTTP→HTTPS redirect is on.

**Deploy: `deploy.ps1` over FTPS — the gotchas that cost the most time**
- Command: `deploy.ps1 -FtpHost server315-4.web-hosting.com -User spotless360ga@spotless360ga.com -RemoteDir /`
- **Connect to `server315-4.web-hosting.com`, NOT `ftp.spotless360ga.com`.** The FTP server presents
  a `*.web-hosting.com` cert; the domain name fails TLS validation ("remote certificate is invalid").
  Using the server's own hostname keeps verification fully on — no need to disable cert checks.
- **`KeepAlive = $false` + retries.** With pooled connections the server 451s on roughly every third
  file ("Local error in processing"). First run landed 32/47; with a fresh connection per file and up
  to 4 attempts it is 51/51. Most files still report `(retry 1)` — that is expected here.
- The FTP account is chrooted, so `-RemoteDir /` **is** `public_html`. Use `-ListRemote` to confirm
  where an account actually lands before writing (cPanel defaults a new FTP account to a subfolder
  named after itself, which is NOT the docroot).
- Credentials: `-SaveCredential` stores them via DPAPI under `%LOCALAPPDATA%\spotless360\`, keyed by
  host — outside the site folder so they can never be swept into a commit or a deploy.
- Excludes `.git`, `.github`, `*.md`, `.gitignore`, `deploy.ps1`, `review-*.mov`.

**"Our Work" is a carousel now (was a 3-photo grid)**
- 9 before/after photos `work-01..09.jpg`, one at a time, auto-advance 2 s, arrows OUTSIDE the frame
  (grid areas; they drop below the photo under 700px), swipe, arrow keys, hover/focus pause, counter.
- **Infinite forward loop via clones:** a copy of slide 9 sits before slide 1 and a copy of slide 1
  after slide 9. Stepping past either end animates onto a clone, then teleports (transition off) to
  the real slide — so 9→1 moves forward instead of rewinding 8 slides.
- **`transitionend` is not guaranteed.** The `animating` latch it clears froze the carousel for good
  when the event never fired. Every move now also arms a 620 ms fallback timer. Do not remove it.

**Video reviews replaced the 3 invented testimonials (home only)**
- The 4 service pages **still show those invented testimonials** — same problem, still published.
- Source clips were **HEVC/H.265, 67 MB**: Chrome only decodes HEVC if the OS lends a codec and
  Firefox not at all, so they showed empty players. Transcoded to **H.264 (720x960)** with the
  built-in **`Windows.Media.Transcoding.MediaTranscoder`** via WinRT — no ffmpeg on this machine.
  43.8 MB → 5.15 MB and 20.2 MB → 3.63 MB.
- Posters extracted with `StorageFile.GetThumbnailAsync`. `MediaComposition` would give an exact
  timestamp but PS 5.1 cannot use its `Clips` IVector (arrives as bare `__ComObject`, and casting to
  `IList<T>` throws). Without a poster, mobile Safari renders a black box.
- `preload="none"` + poster: the 9 MB is not fetched until someone presses play.
- The `.mov` originals stay gitignored; the `.mp4` and posters are committed.

**Those unverified "Rated 5.0 / 127 reviews" claims were removed on 2026-08-21** — see below.

## Session changes — 2026-08-21 (video formats, colour, caching, invented reviews)

**Videos: WebM primary, MP4 fallback — do NOT drop the MP4**
- Client supplied VP9/Vorbis WebM at full 1080x1440. Those are now the first `<source>`;
  the H.264 MP4s stay as a second `<source>`. **iOS Safari only handles WebM from 17.4**, and
  partially — WebM alone would put iPhone visitors back to an empty player. Browsers fetch one.
- WebM is not smaller here (6.2 MB vs 5.2 MB for review-1) but carries 2x the pixels.

**The "saturated" video complaint — cause was my own transcode**
- Transcoding the HEVC originals with `MediaTranscoder` blew the colour out: review-2's frame went
  to **saturation 0.50 with 35% of pixels clipped**. The posters were cut from those MP4s, so the
  still frame — the first thing anyone sees — was the worst-looking part.
- Fix: re-derive **everything from the client's WebM**, whose colour is correct. Both MP4s and both
  posters now sit at saturation 0.10–0.17 with ~0% clipping.
- Ruled out HDR first: the files carry no `colr`, `dvcC`, `mdcv` or `clli`, so there was no tone
  mapping to get wrong.
- **Bitrate gotcha:** `MediaEncodingProfile.CreateMp4(HD720p)` defaults to **9 Mbps**. Setting
  Width/Height without setting `Video.Bitrate` produced a 24 MB "fallback". Set the bitrate
  explicitly — 810x1080 @ 1.8 Mbps gives 5.2 MB / 3.6 MB.

**Posters must be captured in the browser, not from the shell**
- `StorageFile.GetThumbnailAsync` does NOT return frame 0 — Windows picks a "representative" frame,
  which here landed in the b-roll. Both clips have the customer on camera from 0 s.
- `MediaComposition` would allow an exact timestamp but is **unusable from PS 5.1**: its `Clips`
  IVector arrives as a bare `__ComObject`. `.Add()`, `.Append()`, an `IList<T>` cast and reflection
  on `Append` all fail. Don't retry this path.
- Instead the dev server (`scratchpad/serve-spotless360.ps1`) gained **`POST /_save?name=`**, which
  writes the body into `assets/`. The page draws the frame to a canvas and posts the blob straight
  to disk — no megabytes of base64 round-tripping through the agent. Reusable for any capture.

**Caching — the host was serving stale CSS for a week**
- Namecheap defaulted CSS and images to `max-age=604800`. Deploys overwrite files in place keeping
  their names, so returning visitors kept old CSS/photos for 7 days. A 2x2 card layout looked
  broken for exactly this reason, and the corrected posters would never have reached them.
- Added **`.htaccess`**: HTML `no-cache`, CSS/JS 1 h + `must-revalidate`, images 1 day +
  `must-revalidate`, video 30 days. Revalidation means unchanged files still cost only a 304.
- Every rule is wrapped in `IfModule` — a malformed `.htaccess` 500s the whole site.

**Home services grid is 2x2 now**
- "Airflow Test & AC Mold Inspection" card removed (it was the only one with no page of its own,
  pointing at `#quote`). New `.cards--2`; `.cards--split` is still there if a 5th card returns.
- `icon-airflow.png` is now unreferenced but still deploys.

**Invented reviews removed**
- Visible: the hero "Google Reviews ★★★★★" badge, and the "Rated 5.0 on Google" line — the latter
  was on **5 pages**, not just the home.
- Structured data: `aggregateRating` 5.0 / 127 reviews stripped from **6 pages**. It was the last
  property in each object, so the trailing comma had to go with it or the whole block turns into
  invalid JSON and Google discards *all* the page's structured data.
- Replaced with two **`VideoObject`** entries for the real testimonial videos (name, description,
  poster, duration, contentUrl). Confirmed with the client that these are genuine customers
  speaking, opening on job footage.
- `.greviews` / `.hero__greviews` CSS is now unused — kept in case the badge returns with real reviews.
- services.html: dropped "UV light installation & replacement" from the air-duct list.

## TODO / next steps

- [ ] **Connect forms to a real destination** — still `action="#"` (now with the package selector).
- [x] ~~Airflow Test & AC Mold Inspection had no page~~ — card removed 2026-08-21.
- [x] ~~canonical/JSON-LD pointed at the wrong domain~~ — all 65 self-URLs now `spotless360ga.com`.
- [ ] Decide whether to rename `-repair.html` files to `-maintenance.html` (needs redirects) or leave.
- [x] ~~`sitemap.xml` + `robots.txt`~~ — added 2026-08-19.
- [x] ~~Invented review claims~~ — removed 2026-08-21 (visible + JSON-LD).
- [ ] "1249+ homes served" is still an unverified number in the About copy.
- [ ] Swap the 3 invented testimonials still live on the 4 service pages.
- [ ] Turn GitHub Pages off, and submit the sitemap in Search Console.
- [ ] Write remaining "coming soon" blog articles; per-service hero photos for Dryer/Chimney/Gutter.
- [ ] Favicon from the new logo.

## Note on memory

Cross-session "memory" is keyed to the folder path and does NOT follow this project reliably.
**Treat this CLAUDE.md + PROJECT.md as the source of truth** and update them as work progresses.
