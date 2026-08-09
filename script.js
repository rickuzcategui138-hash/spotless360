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
      link('air-duct-cleaning-repair.html', 'Air Duct Cleaning &amp; Repair', true) +
      link('dryer-vent-cleaning-repair.html', 'Dryer Vent Cleaning &amp; Repair', true) +
      link('chimney-cleaning-repair.html', 'Chimney Cleaning &amp; Repair', true) +
      link('gutter-cleaning-repair.html', 'Gutter Cleaning &amp; Repair', true) +
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
