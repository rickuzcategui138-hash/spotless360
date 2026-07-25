// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu when a real link is tapped
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
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
