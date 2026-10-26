/**
 * MASS MOVEMENT UK — Master JavaScript Logic
 * Tagline: "Jesus. To Every Generation. To Every Nation."
 * Vanilla Static Browser Execution
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  setActiveNavLink();
  initScrollReveal();
  initAccordions();
  initContactForm();
  initBackToTop();
  initEventTabs();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const backdrop = document.querySelector('.mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileNav) return;

  const toggleNav = (forceState) => {
    const shouldOpen = forceState !== undefined ? forceState : !mobileNav.classList.contains('open');

    if (shouldOpen) {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', () => toggleNav());
  if (backdrop) backdrop.addEventListener('click', () => toggleNav(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleNav(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleNav(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. ACTIVE NAVIGATION LINK IDENTIFIER
   -------------------------------------------------------------------------- */
function setActiveNavLink() {
  const path = window.location.pathname;
  let page = path.split('/').pop();
  if (!page || page === '') page = 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   5. ACCORDION COMPONENT (BELIEFS & FAQS)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Optional: close other open items in the same container
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.accordion-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
      }

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT & SUPPORT FORM VALIDATION + MODAL
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.querySelector('[data-contact-form]');
  const modal = document.querySelector('.form-response-modal');
  const modalClose = document.querySelector('[data-close-modal]');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic HTML5 validation pass
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.focus();
      }
    });

    if (!isValid) return;

    // Show response modal simulating S3 static readiness
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      alert('Thank you. Your message form is ready to be connected to the MASS UK contact system.');
    }

    contactForm.reset();
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. EVENT TABS / FILTERING
   -------------------------------------------------------------------------- */
function initEventTabs() {
  const tabBtns = document.querySelectorAll('[data-event-tab]');
  const eventSections = document.querySelectorAll('[data-event-group]');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetGroup = btn.getAttribute('data-event-tab');

      tabBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      tabBtns.forEach(b => b.classList.add('btn-secondary'));

      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-secondary');

      eventSections.forEach(section => {
        const group = section.getAttribute('data-event-group');
        if (targetGroup === 'all' || group === targetGroup) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
}
