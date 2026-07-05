/* ============================================
   TYPED.JS INITIALIZATION
   ============================================ */

var typed = new Typed('#typing', {
  strings: [
    'Full Stack Developer • Generative AI Enthusiast'
  ],
  typeSpeed: 50,
  backSpeed: 0,
  startDelay: 300,
  showCursor: false,
  loop: false
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the mobile menu whenever a nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu if window is resized back to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */

window.addEventListener('scroll', reveal);

function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}

reveal();

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const offsetTop = targetElement.offsetTop - navHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* ============================================
   NAVIGATION ACTIVE STATE
   ============================================ */

window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   BUTTON INTERACTIONS
   ============================================ */

const buttons = document.querySelectorAll('.btn, .project-buttons a, .contact-icon');

buttons.forEach(button => {
  button.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px)';
  });

  button.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

/* ============================================
   CARD ANIMATIONS
   ============================================ */

const cards = document.querySelectorAll('.skill-card, .project-card, .contact-item');

cards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.2)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.boxShadow = '';
  });
});

/* ============================================
   INTERSECTION OBSERVER FOR OPTIMIZED REVEAL
   ============================================ */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
  observer.observe(element);
});

/* ============================================
   WINDOW RESIZE HANDLER
   ============================================ */

window.addEventListener('resize', debounce(() => {
  reveal();
}, 250));

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ============================================
   PAGE LOAD
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  reveal();
});

/* ============================================
   ACCESSIBILITY: KEYBOARD SHORTCUTS
   ============================================ */

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key.toLowerCase()) {
      case 'h':
        e.preventDefault();
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 's':
        e.preventDefault();
        document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'p':
        e.preventDefault();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'c':
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
});