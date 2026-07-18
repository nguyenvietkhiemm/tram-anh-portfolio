/* ═══════════════════════════════════════════════════════════════
   Trâm Anh · Portfolio — interactions
   ═══════════════════════════════════════════════════════════════ */
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Scroll progress + navbar state ────────────────────────── */
const bar    = $('#scrollProgress');
const navbar = $('#navbar');

const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  navbar.classList.toggle('scrolled', scrollY > 24);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── Active nav link (scroll spy) ──────────────────────────── */
const navLinks = $$('#navMenu a');
const linkFor  = id => navLinks.find(a => a.getAttribute('href') === '#' + id);

const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('is-active'));
    linkFor(e.target.id)?.classList.add('is-active');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => spy.observe(s));

/* ─── Reveal on scroll (staggered among siblings) ───────────── */
const revealEls = $$('.reveal');

if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      el.style.transitionDelay = (Math.max(0, sibs.indexOf(el)) * 80) + 'ms';
      el.classList.add('visible');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

/* ─── Mobile menu ───────────────────────────────────────────── */
const toggle  = $('#navToggle');
const navMenu = $('#navMenu');

const setMenu = open => {
  navMenu.classList.toggle('is-open', open);
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
toggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('is-open')));
navMenu.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
addEventListener('resize', () => { if (innerWidth > 620) setMenu(false); }, { passive: true });

/* ─── Video embeds (muted autoplay + loop, lazy on scroll) ──── */
function loadVideo(btn) {
  const { yt, drive } = btn.dataset;
  const iframe = document.createElement('iframe');
  iframe.title = btn.getAttribute('aria-label') || 'Video';
  iframe.loading = 'lazy';
  if (yt) {
    iframe.src = `https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&loop=1&playlist=${yt}&controls=1&modestbranding=1&rel=0&playsinline=1`;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
  } else if (drive) {
    iframe.src = `https://drive.google.com/file/d/${drive}/preview`;
    iframe.allow = 'autoplay';
    iframe.allowFullscreen = true;
  } else {
    return;
  }
  const frame = document.createElement('div');
  frame.className = [...btn.classList, 'film-loaded'].join(' ');
  frame.appendChild(iframe);
  btn.replaceWith(frame);
}

const films = $$('.film[data-yt], .film[data-drive]');
if (reduceMotion) {
  // reduced motion: keep them as click-to-play facades, no autoplay
  films.forEach(btn => btn.addEventListener('click', () => loadVideo(btn)));
} else {
  const vio = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { loadVideo(e.target); vio.unobserve(e.target); } });
  }, { rootMargin: '300px 0px' });
  films.forEach(btn => vio.observe(btn));
}
