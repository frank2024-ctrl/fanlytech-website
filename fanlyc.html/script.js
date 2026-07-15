// ============================================
// FANLYTECH TECH — Site Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile nav toggle ----
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.textContent = isOpen ? '✕' : '☰';
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          navToggle.textContent = '☰';
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  
    // ---- Scroll reveal animations ----
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in-view'));
    }
  
    // ---- Header shadow on scroll ----
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(0,0,0,0.25)' : 'none';
      }, { passive: true });
    }
  
    // ---- Animated counters (hero stats) ----
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();
          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(c => counterObserver.observe(c));
    }
  
    // ---- Contact form handling (client-side demo submission) ----
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const name = document.getElementById('name').value.trim();
  
        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }
  
        status.textContent = `Thanks, ${name.split(' ')[0]} — your message has been received. Our team will reply within one business day.`;
        status.classList.add('show');
        contactForm.reset();
      });
    }
  
    // ---- Generic card filter (used by blog and portfolio pages) ----
    function setupFilter(filterId, gridId, emptyId) {
      const filterBar = document.getElementById(filterId);
      const grid = document.getElementById(gridId);
      if (!filterBar || !grid) return;
      const buttons = filterBar.querySelectorAll('button');
      const cards = grid.querySelectorAll('[data-category]');
      const emptyMsg = emptyId ? document.getElementById(emptyId) : null;
  
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;
          let visibleCount = 0;
          cards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.display = match ? '' : 'none';
            if (match) visibleCount++;
          });
          if (emptyMsg) emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        });
      });
    }
    setupFilter('blog-filter', 'blog-grid', 'blog-empty');
    setupFilter('portfolio-filter', 'case-grid', null);
  
    // ---- Newsletter form (client-side demo submission) ----
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed ✓';
        newsletterForm.reset();
        setTimeout(() => { btn.textContent = originalText; }, 3000);
      });
    }
  
    // ---- Pricing page: monthly/annual billing toggle ----
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
      const buttons = billingToggle.querySelectorAll('button');
      const amounts = document.querySelectorAll('.amount');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const mode = btn.dataset.billing;
          amounts.forEach(el => {
            const val = el.dataset[mode];
            el.textContent = '$' + Number(val).toLocaleString();
          });
        });
      });
    }
  
    // ---- FAQ: close others when one opens (optional accordion feel) ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          faqItems.forEach(other => {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  
  });