// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) closeServices();
  });

  // Close menu when a real link is tapped
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      closeServices();
    });
  });
}

// Services dropdown
const servicesItem = document.getElementById('servicesItem');
const servicesToggle = document.getElementById('servicesToggle');

function closeServices() {
  if (!servicesItem) return;
  servicesItem.classList.remove('open');
  servicesToggle.setAttribute('aria-expanded', 'false');
}

if (servicesItem && servicesToggle) {
  servicesToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = servicesItem.classList.toggle('open');
    servicesToggle.setAttribute('aria-expanded', String(open));
  });

  // Click outside closes it
  document.addEventListener('click', (e) => {
    if (!servicesItem.contains(e.target)) closeServices();
  });

  // Escape closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeServices();
  });
}

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile bottom tab bar (app-style) — built here so it's identical on every page
(function buildBottomNav() {
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isHome = file === '' || file === 'index.html';
  const servicePages = [
    'services.html',
    'air-duct-cleaning-repair.html',
    'dryer-vent-cleaning-repair.html',
    'chimney-cleaning-repair.html',
    'gutter-cleaning-repair.html',
  ];
  const active = isHome ? 'home' : servicePages.indexOf(file) !== -1 ? 'services' : '';

  const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11h14V9"/><path d="M9.5 20v-6h5v6"/></svg>',
    services: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
  };

  const bar = document.createElement('nav');
  bar.className = 'bottom-nav';
  bar.setAttribute('aria-label', 'Quick navigation');
  bar.innerHTML =
    '<a class="bottom-nav__item' + (active === 'home' ? ' is-active' : '') + '" href="index.html">' +
      '<span class="bottom-nav__ico">' + icons.home + '</span>' +
      '<span class="bottom-nav__label">Home</span></a>' +
    '<a class="bottom-nav__item' + (active === 'services' ? ' is-active' : '') + '" href="services.html">' +
      '<span class="bottom-nav__ico">' + icons.services + '</span>' +
      '<span class="bottom-nav__label">Services</span></a>' +
    '<a class="bottom-nav__item bottom-nav__call" href="tel:+14706604517" aria-label="Call Spotless360">' +
      '<span class="bottom-nav__ico">' + icons.call + '</span>' +
      '<span class="bottom-nav__label">Call</span></a>' +
    '<a class="bottom-nav__item" href="index.html#quote">' +
      '<span class="bottom-nav__ico">' + icons.book + '</span>' +
      '<span class="bottom-nav__label">Book</span></a>' +
    '<button type="button" class="bottom-nav__item bottom-nav__more" id="bottomNavMore" aria-label="Open menu">' +
      '<span class="bottom-nav__ico">' + icons.more + '</span>' +
      '<span class="bottom-nav__label">More</span></button>';

  document.body.appendChild(bar);

  // "More" opens the slide-up menu sheet
  const moreBtn = document.getElementById('bottomNavMore');
  if (moreBtn) {
    moreBtn.addEventListener('click', () => openSheet());
  }
})();

// Promo modal — home page only, appears 5s after load, once per session
(function buildPromoModal() {
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isHome = file === '' || file === 'index.html';
  if (!isHome) return;
  if (sessionStorage.getItem('promoSeen')) return;

  const calIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/></svg>';
  const closeIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  const arrowIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  const phoneIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z"/></svg>';

  const modal = document.createElement('div');
  modal.className = 'promo';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Schedule your inspection online');
  modal.innerHTML =
    '<div class="promo__card">' +
      '<button type="button" class="promo__close" id="promoClose" aria-label="Close">' + closeIco + '</button>' +
      '<div class="promo__ico">' + calIco + '</div>' +
      '<div class="promo__title">Schedule Your Inspection Online</div>' +
      '<p class="promo__text">Choose your service and reserve an available appointment time.</p>' +
      '<a class="promo__btn promo__btn--primary" href="index.html#quote"><span>Schedule Online Now</span>' + arrowIco + '</a>' +
      '<a class="promo__btn promo__btn--secondary" href="tel:+14706604517">' + phoneIco + '<span>Call Now: (470) 660-4517</span></a>' +
    '</div>';

  document.body.appendChild(modal);

  function open() {
    modal.classList.add('open');
    document.body.classList.add('promo-open');
    sessionStorage.setItem('promoSeen', '1');
  }
  function close() {
    modal.classList.remove('open');
    document.body.classList.remove('promo-open');
  }

  document.getElementById('promoClose').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  modal.querySelector('.promo__btn--primary').addEventListener('click', close);

  setTimeout(open, 7000);
})();

// Header mobile CTAs — Call + Schedule (injected so they're identical on every page)
(function buildHeaderCta() {
  const inner = document.querySelector('.header__inner');
  if (!inner) return;
  const phoneIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z"/></svg>';
  const calIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/></svg>';

  const group = document.createElement('div');
  group.className = 'header-mcta';
  group.innerHTML =
    '<a class="header-mcta__btn header-mcta__call" href="tel:+14706604517" aria-label="Call Spotless360">' +
      phoneIco + '<span>Call</span></a>' +
    '<a class="header-mcta__btn header-mcta__book" href="index.html#quote">' +
      calIco + '<span>Schedule</span></a>';

  inner.appendChild(group);
})();

// Slide-up menu (bottom sheet) — opened by the "More" button
var openSheet = function () {};
(function buildMenuSheet() {
  const chev = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  const closeIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  const phoneIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1z"/></svg>';

  const link = (href, label, sub) =>
    '<a class="sheet__link' + (sub ? ' sheet__link--sub' : '') + '" href="' + href + '">' +
      '<span>' + label + '</span>' + chev + '</a>';

  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';
  backdrop.id = 'sheetBackdrop';

  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.id = 'menuSheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-label', 'Menu');
  sheet.innerHTML =
    '<div class="sheet__handle" id="sheetHandle"></div>' +
    '<div class="sheet__head">' +
      '<span class="sheet__title">Menu</span>' +
      '<button type="button" class="sheet__close" id="sheetClose" aria-label="Close menu">' + closeIco + '</button>' +
    '</div>' +
    '<div class="sheet__body">' +
      link('index.html', 'Home') +
      link('about.html', 'About') +
      link('blog.html', 'Blog') +
      link('index.html#quote', 'Schedule Online') +
      '<div class="sheet__section">Services</div>' +
      link('air-duct-cleaning-repair.html', 'Air Duct Cleaning &amp; Maintenance', true) +
      link('dryer-vent-cleaning-repair.html', 'Dryer Vent Cleaning &amp; Maintenance', true) +
      link('chimney-cleaning-repair.html', 'Chimney Cleaning &amp; Maintenance', true) +
      link('gutter-cleaning-repair.html', 'Gutter Cleaning &amp; Maintenance', true) +
      link('services.html', 'View all services', true) +
      '<a class="sheet__call" href="tel:+14706604517">' + phoneIco + '<span>(470) 660-4517</span></a>' +
    '</div>';

  document.body.appendChild(backdrop);
  document.body.appendChild(sheet);

  function open() {
    sheet.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('sheet-open');
  }
  function close() {
    sheet.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('sheet-open');
  }
  openSheet = open;

  document.getElementById('sheetClose').addEventListener('click', close);
  backdrop.addEventListener('click', close);
  sheet.querySelectorAll('.sheet__link, .sheet__call').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Swipe-down on the handle/header to close
  const handleArea = sheet.querySelector('.sheet__head');
  const grip = document.getElementById('sheetHandle');
  let startY = null;
  function onStart(e) { startY = e.touches ? e.touches[0].clientY : null; sheet.style.transition = 'none'; }
  function onMove(e) {
    if (startY === null) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 0) sheet.style.transform = 'translateY(' + dy + 'px)';
  }
  function onEnd(e) {
    if (startY === null) return;
    const dy = (e.changedTouches ? e.changedTouches[0].clientY : startY) - startY;
    sheet.style.transition = '';
    sheet.style.transform = '';
    if (dy > 90) close();
    startY = null;
  }
  [grip, handleArea].forEach((el) => {
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd);
  });
})();

// Offer package selector — injected into booking/quote forms only, so it's identical everywhere.
// Short "Request a Callback" forms (name + phone + message) are left untouched.
(function buildOfferPackages() {
  // Each package shows a "?" info dot; hovering (or focusing / tapping) it reveals what's included.
  const tip = (label, items) =>
    '<span class="pkg-info" tabindex="0" role="button" aria-label="See what ' + label + ' includes">' +
      '<span class="pkg-info__ico" aria-hidden="true">?</span>' +
      '<span class="pkg-tip" role="tooltip"><ul>' +
        items.map((i) => '<li>' + i + '</li>').join('') +
      '</ul></span>' +
    '</span>';

  const pkgHTML =
    '<fieldset class="pkg-select">' +
      '<legend>Choose your package <span class="req">*</span></legend>' +
      '<label class="pkg-option">' +
        '<input type="radio" name="package" value="essential" required />' +
        '<span class="pkg-option__main">' +
          '<span class="pkg-badge">Most Popular</span>' +
          '<span class="pkg-option__name">Essential Vent &amp; Duct Cleaning' +
            tip('Essential Vent &amp; Duct Cleaning', [
              'Supply duct cleaning',
              'Main return cleaning',
              'Vent cover cleaning',
              'Professional negative-air equipment',
              'Whole-System Check-Up + AC Mold Inspection + Airflow Test',
              'Complimentary dryer vent inspection',
              'Before &amp; after photos (upon request)',
              'Complete service coverage for one HVAC system'
            ]) +
          '</span>' +
        '</span>' +
        '<span class="pkg-price">$249</span>' +
      '</label>' +
      '<label class="pkg-option">' +
        '<input type="radio" name="package" value="dryer-airflow" required />' +
        '<span class="pkg-option__main">' +
          '<span class="pkg-option__name">Dryer Vent &amp; Airflow Service' +
            tip('Dryer Vent &amp; Airflow Service', [
              'Lint &amp; debris removal',
              'Exterior vent inspection',
              'Airflow test',
              'Dryer connection inspection',
              'Up to 10 ft. of vent line &mdash; main-level access',
              'Before &amp; after photos (upon request)',
              'Safety-focused visual inspection'
            ]) +
          '</span>' +
        '</span>' +
        '<span class="pkg-price">$89</span>' +
      '</label>' +
      '<label class="pkg-option">' +
        '<input type="radio" name="package" value="bundle" required />' +
        '<span class="pkg-option__main">' +
          '<span class="pkg-badge pkg-badge--value">Best Value</span>' +
          '<span class="pkg-option__name">Air Duct + Dryer Vent Bundle' +
            tip('Air Duct + Dryer Vent Bundle', [
              'Everything included in both packages',
              'Essential Vent &amp; Duct Cleaning',
              'Dryer Vent &amp; Airflow Service',
              'FREE organic deodorizer',
              'Save when you bundle both services!'
            ]) +
          '</span>' +
        '</span>' +
        '<span class="pkg-price">$299</span>' +
      '</label>' +
      '<p class="pkg-error" role="alert" hidden>Please choose a package to continue.</p>' +
    '</fieldset>' +
    '<div class="other-services" aria-hidden="true">' +
      '<p class="other-services__title">Other services you may need&hellip;</p>' +
      '<div class="other-services__opts">' +
        '<label class="other-services__opt"><input type="checkbox" name="addon" value="gutter" /> <span>Gutter Cleaning</span></label>' +
        '<label class="other-services__opt"><input type="checkbox" name="addon" value="chimney" /> <span>Chimney Cleaning</span></label>' +
      '</div>' +
      '<p class="other-services__note">Interested? We&rsquo;ll Inspect &amp; Quote It On-Site &mdash; No Obligation.</p>' +
    '</div>';

  const badgeHTML =
    '<p class="form-assurance"><span class="form-assurance__ico">&#10004;</span> ' +
    'Insured + Qualified Technicians &middot; Same-Day Service Available Upon Request</p>';

  document.querySelectorAll('form.offer-form').forEach((form) => {
    // Only booking/quote forms carry a service address field — skip the short callback forms.
    if (!form.querySelector('input[name="address"]')) return;

    // Drop the old checkbox service picker if present (home hero) — replaced by the packages.
    const oldServices = form.querySelector('.offer-form__services');
    if (oldServices) oldServices.remove();

    // Insert package selector + other-services block at the very top of the form.
    const tmp = document.createElement('div');
    tmp.innerHTML = pkgHTML;
    const frag = document.createDocumentFragment();
    while (tmp.firstChild) frag.appendChild(tmp.firstChild);
    form.insertBefore(frag, form.firstChild);

    // The info dot lives inside the <label>, so a click would otherwise tick the radio.
    // Swallow it, and toggle .is-open so touch devices (no hover) can read the tip too.
    form.querySelectorAll('.pkg-info').forEach((info) => {
      info.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasOpen = info.classList.contains('is-open');
        form.querySelectorAll('.pkg-info.is-open').forEach((o) => o.classList.remove('is-open'));
        if (!wasOpen) info.classList.add('is-open');
      });
      info.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); info.click(); }
        if (e.key === 'Escape') info.classList.remove('is-open');
      });
    });

    // Assurance badge at the bottom of the card.
    const badgeWrap = document.createElement('div');
    badgeWrap.innerHTML = badgeHTML;
    form.appendChild(badgeWrap.firstChild);

    const other = form.querySelector('.other-services');
    const fieldset = form.querySelector('.pkg-select');
    const err = form.querySelector('.pkg-error');

    // Reveal "other services" (with animation) once a package is chosen.
    form.querySelectorAll('input[name="package"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        if (other) {
          other.classList.add('is-visible');
          other.setAttribute('aria-hidden', 'false');
        }
        if (fieldset) fieldset.classList.remove('has-error');
        if (err) err.hidden = true;
      });
    });

    // Forms use novalidate, so enforce "pick a package" ourselves on submit.
    form.addEventListener('submit', (e) => {
      if (!form.querySelector('input[name="package"]:checked')) {
        e.preventDefault();
        if (fieldset) {
          fieldset.classList.add('has-error');
          fieldset.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (err) err.hidden = false;
      }
    });
  });

  // Touch has no hover, so an open tip must be dismissible: tapping anywhere outside it closes it.
  // Clicks on the dot itself never reach here — that handler stops propagation.
  document.addEventListener('click', (e) => {
    const open = document.querySelector('.pkg-info.is-open');
    if (!open || open.contains(e.target)) return;
    open.classList.remove('is-open');
  });

  // Escape closes it from anywhere, not just while the dot holds focus.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.pkg-info.is-open').forEach((o) => o.classList.remove('is-open'));
  });

  // Scrolling away on mobile should not leave a stray panel floating over the form.
  window.addEventListener('scroll', () => {
    const open = document.querySelector('.pkg-info.is-open');
    if (open) open.classList.remove('is-open');
  }, { passive: true });
})();
