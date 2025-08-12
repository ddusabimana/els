
// ===== Config =====
const FORM_ENDPOINT = ""; // e.g., 'https://formspree.io/f/xxxxxx'

// ===== Mobile Nav =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
document.querySelectorAll('.gallery .zoomable').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightbox?.querySelector('.close')?.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-delay, .rise').forEach(el => revealObserver.observe(el));

// ===== Contact Form =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
function setError(id, msg) {
  const row = document.getElementById(id).closest('.form-row');
  row.querySelector('.error').textContent = msg;
}
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    ['name','email','message'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) { setError(id, 'This field is required.'); valid = false; }
      else setError(id, '');
    });
    const email = document.getElementById('email').value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email','Enter a valid email'); valid = false; }
    if (!valid) return;
    status.textContent = 'Sending...';

    const payload = {
      name: document.getElementById('name').value.trim(),
      email,
      phone: document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    if (!FORM_ENDPOINT) {
      await new Promise(r => setTimeout(r, 700));
      status.textContent = 'Message sent! (Demo mode)';
      form.reset();
      setTimeout(() => status.textContent = '', 3500);
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      status.textContent = res.ok ? 'Thank you! We will contact you soon.' : 'There was an issue sending your message.';
      if (res.ok) form.reset();
    } catch {
      status.textContent = 'Network error. Please try again.';
    }
    setTimeout(() => status.textContent = '', 4000);
  });
}
