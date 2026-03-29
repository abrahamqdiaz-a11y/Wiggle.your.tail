/* ═══════════════════════════════════════════
   WIGGLE YOUR TAIL — SHARED JAVASCRIPT
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('nav.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });
  }

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* ── Scroll-triggered fade-in animations ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        setTimeout(() => {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0) scale(1)';
        }, parseInt(en.target.dataset.delay) || 0);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });

  const animSelectors = [
    '.price-card', '.rc', '.faq-item', '.area-tag',
    '.proc-card', '.wp-row', '.av-row', '.how-step',
    '.service-card', '.svc', '.info-card', '.feat-row'
  ];

  document.querySelectorAll(animSelectors.join(',')).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px) scale(0.98)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    el.dataset.delay = (i % 5) * 65;
    io.observe(el);
  });

  /* ── Active nav link ── */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('https://wiggleyourtail.com', ''))) {
      a.classList.add('active');
    }
  });

});
