/* ============================================================
   BIENES Y RAÍCES I.V.C. — script.js
   ============================================================ */


/* ============================================================
   1. NAVIGATION — Scroll effect & mobile menu
   ============================================================ */
const nav        = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Add .scrolled class after 40px of scroll
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // apply on load

// Toggle mobile menu
function setMenu(open) {
  menuToggle.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => {
  setMenu(!mobileMenu.classList.contains('open'));
});

// Close menu when a link is clicked
document.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(el => {
  el.addEventListener('click', () => setMenu(false));
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    setMenu(false);
  }
});

// Close menu on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false);
});


/* ============================================================
   2. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));


/* ============================================================
   3. TESTIMONIAL SLIDER
   ============================================================ */
const slides      = document.querySelectorAll('.testimonial');
const dots        = document.querySelectorAll('.testimonials__dot');
let current       = 0;
let autoplayTimer = null;

function showSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  dots[current].setAttribute('aria-selected', 'false');

  current = index;

  slides[current].classList.add('active');
  dots[current].classList.add('active');
  dots[current].setAttribute('aria-selected', 'true');
}

function nextSlide() {
  showSlide((current + 1) % slides.length);
}

function startAutoplay() {
  autoplayTimer = setInterval(nextSlide, 5500);
}

function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    resetAutoplay();
  });
});

// Pause autoplay on hover
const testimonialSection = document.querySelector('.testimonials');
if (testimonialSection) {
  testimonialSection.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  testimonialSection.addEventListener('mouseleave', startAutoplay);
}

startAutoplay();


/* ============================================================
   4. SMOOTH SCROLL — Offset for fixed nav
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id     = this.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // matches --nav-h in CSS
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
