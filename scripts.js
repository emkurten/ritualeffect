/* ─── NAV SCROLL STATE ───────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── HAMBURGER MENU ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.menu-close').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── CONTACT FORM (Formspree) ──────────────────────────────── */
const contactForm   = document.getElementById('contact-form');
const contactStatus = contactForm.querySelector('.form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = contactForm.querySelector('[name="email"]').value.trim();
  if (!email) {
    contactStatus.textContent = 'Please enter your email address.';
    contactStatus.className = 'form-status error';
    return;
  }

  const btn = contactForm.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  contactStatus.textContent = '';
  contactStatus.className = 'form-status';

  try {
    const res = await fetch('https://formspree.io/f/mvzllooj', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name:  contactForm.querySelector('[name="name"]').value.trim(),
        email: email,
      }),
    });

    if (res.ok) {
      contactStatus.textContent = "You're in. We'll be in touch.";
      contactStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      contactStatus.textContent = 'Something went wrong. Please try again.';
      contactStatus.className = 'form-status error';
    }
  } catch {
    contactStatus.textContent = 'Could not connect. Check your connection and try again.';
    contactStatus.className = 'form-status error';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Subscribe';
  }
});