/* ===== Active nav link on scroll ======================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => observer.observe(section));

/* ===== Mobile nav toggle ================================ */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-open');
  const isOpen = navMenu.classList.contains('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('is-open'));
});

/* ===== Drag-to-scroll on horizontal video track ========= */
const wrapper = document.querySelector('.scroll-loop-wrapper');
const track   = document.querySelector('.scroll-loop-track');
let isDragging = false;
let startX, scrollLeft;

wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX     = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
  track.style.animationPlayState = 'paused';
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  track.style.animationPlayState = 'running';
});

wrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x    = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
});

/* Touch support */
wrapper.addEventListener('touchstart', (e) => {
  startX     = e.touches[0].pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
  track.style.animationPlayState = 'paused';
}, { passive: true });

wrapper.addEventListener('touchend', () => {
  track.style.animationPlayState = 'running';
}, { passive: true });

wrapper.addEventListener('touchmove', (e) => {
  const x    = e.touches[0].pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
}, { passive: true });
