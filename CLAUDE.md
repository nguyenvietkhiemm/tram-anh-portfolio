# CLAUDE.md

Portfolio site for **Phan Trâm Anh** — a Vietnamese video editor. Single-page site that showcases her showreel, experience and selected work for job applications.

## Stack & workflow

- **Vanilla HTML / CSS / JS** — no framework, no build step, no package manager.
- Three source files: `index.html`, `style.css`, `script.js`. Plus `favicon.svg` and `images/`, organised into subfolders:
  - `images/photos/` — `avatar.jpg`, `cert-premiere.jpg`
  - `images/brand/` — `mcv-logo.png` (MCV experience card), `ajc.png` (education)
  - `images/title/` — `ltr-{p,o1,r,t,f,o2,l,i,o3}.png`, the ransom-note "Portfolio" letter scraps
  - `images/skills/` — `skill-{pr,ae,ps,ai}.png` (clean Adobe logos) + `capcut-logo.png`, the Editing-tools logos
  - `images/mascot/` — `monkey_max.png` + `max-{1,3,6,9,11}.png` (Max sprites), faint `.proj-bg` watermarks confined to Monkey-Vietnam areas
  - `images/notes/` — `note-1.png` (lined-paper scrap used for both the Hello card and the AI-tools note), `note-3.png`/`note-ai.png` (spare paper scraps)
  - `images/src/` — raw source images the above were cut from (`p.jpg`/`o.jpg`/… letters, `editor.png`, `decor.jpg`, `note-*.jpg`, `hoa-tiet-*.jpg`, spares); not referenced by the site, kept for re-cropping.
- A separate `lan-chat/` tool is git-ignored and unrelated to the site.
- **Preview**: open `index.html` directly in a browser (or any static server). There are no build/test/lint commands.
- **Deploy**: GitHub repo `nguyenvietkhiemm/tram-anh-portfolio`, branch `main`. Commit/push only when the user asks.
- `.gitignore` excludes `*.pdf`, `canva_fetched/`, and OS cruft.

## Aesthetic

Notebook / scrapbook theme on graph-paper: red margin rule, hole punches, polaroid frames, washi tape, rubber stamps, sticky notes, hand-drawn marginalia doodles. Everything is intentionally slightly rotated / imperfect. Section headings follow the original Canva look — handwritten **Caveat** in **blue** (`.sec-title`, no uppercase); blue (`--blue`) is the accent tone for kickers, dates, project titles.

## Page structure (`index.html`)

Fixed `#navbar` → `<main>` with sections, then `<footer>`. Section order (kicker numbers + alternating `.page--alt` background follow this order):

- `#hero .page--cover` — ransom-note "Portfolio" title, "Hello!" intro card (`.card--note`, backed by the real kraft scrap `note-1.png`; bio + traits), and the polaroid portrait (`.polaroid--cover`, `photos/avatar.jpg`, tape + caption "Trâm Anh · 24 years old").
- `#about` — "About me" section: two `.note-card`s (white paper-note look with a glossy red push-`.note-pin` at top center). **Details** card = DOB, address, email/phone/IG; **Education** card = AJC + GPA + `.note-logo`.
- `#experience` — two `.card--exp` (`.card--monkey` with `.exp-mascot` flat red Max peeking over the top edge; `.card--mcv` with `.exp-logo`), scrapbook decor, then **Skills** (`.skills-wrap`: two columns split by a dashed vertical divider — "Editing tools" = real logo tiles `.sk-sticker.sk-img`; "AI tools" = a handwritten 2-column checklist (`.ai-cols` → two `.ai-list`) on a real lined-paper scrap `.ai-paper` (`notes/note-1.png`, `aspect-ratio` + asymmetric padding keep the text on the white ruled area, clear of holes/margin/tape/stars; drop-shadow follows the silhouette)).
- `#projects` (nav label "Work") — project articles (see below).
- `#certificates` — polaroid + cert cards (last section).

The old `#contact` "Let's talk" section was removed. Contact details live in the `#about` **Details** note-card and in `.footer-contact` (footer bar) — there is no dedicated Contact section. (The hero once held a consolidated `.about-card` / `.cc-row` block; that was split back out into the `#about` section. Some `.cc-*` / `.contact-card` rules may linger in `style.css` — harmless.) `style.css` still contains some now-unused `.about-grid` / `.contact-*` (the old section) / `.stamp--blue` rules — harmless, kept in case those return.

### Work projects

MCV videos sit inside a **browser-window mockup** (`.browser` → `.browser-bar`/`.browser-dot`/`.browser-expand` + `.browser-body`, default blue bar). The Monkey article has a faint themed line-art **watermark** behind it (`.proj-bg`, `z-index:-1`, opacity .14): Max faces + kids-education shapes (red), hidden ≤760px. Doctor Network has its own scattered medical line-art watermark (`.proj-bg`, blue): syringes, stethoscope, pulse, pill, tooth, heart+plus, plus-in-circle.

- **Monkey Vietnam** (`.proj--monkey`) — current/flagship job. Four series rows, each a **scrapbook `.hl-grid`** (flex, no browser frame): 3 taped, tilted polaroid-style frames — the centered **highlight** (`.film--hl`) is bigger, raised, with a red ring + a "★ Highlight" pill badge (`::after`); the two supporting videos are smaller, dimmed, rotated outward. A little Max mascot peeks over the top edge of each frame (`.film::before` background-image — `mascot/max-11.png` on the highlight, `max-6.png` on the left, `max-9.png` on the right). Series: Monkey Stories, Kindy Class, Monkey ABC 2D, Mascot AI Max. `monkey_max.png` mascot faded top-right (`.proj-mascot`).
- **Doctor Network** (`.proj--mcv`, title displays "Doctor Network") — "What the Doctor Says" experience. The marquee + Highlights video panels were removed; the article is now the head + a partner row: an intro (`.partner-intro`) = a video in a browser-tab mockup (`.browser.partner-video`, yt `7dCyfLD-haU`) → swirly `.partner-arrow` → a handwritten "Short-form videos:" + scattered Tiktok/Reels/Shorts (`.shortform`/`.sf-head`/`.sf-tag`); then a left-aligned plain `.mcv-left-title` "Collaborations with healthcare partners" above `.partner-grid`: two `.partner-pair`s, each a partner channel screenshot → hand-drawn `.partner-arrow` → its results grid (`projects/2→1`, `projects/4→3`). (`.marquee` / `.vid-grid--center` CSS now unused but kept.)

## Key implementation details

- **Cut-out title**: ransom-note "Portfolio" is a single ready-made collage image `title/portfolio.png` — `<img class="portfolio-img">` inside `<h1 class="cutout cutout--photo">`; `aria-label` carries the real word, img is `aria-hidden`. (Earlier approaches — the CSS `.ct .ct--X` letters and the per-letter `ltr-*.png` scraps now in `images/src/` — are unused but left for reference.)
- **Video embeds**: `.film` buttons carry `data-yt` or `data-drive`; `loadVideo()` in `script.js` swaps the button for an `<iframe>`. They auto-load lazily on scroll (IntersectionObserver) and play **muted + looping** (`autoplay=1&mute=1&loop=1&playlist=<ID>`); under `prefers-reduced-motion` they stay click-to-play. Thumbnails come from `https://i.ytimg.com/vi/<ID>/hqdefault.jpg`.
- **Progressive enhancement**: an inline script adds `js` to `<html>`; `.js .reveal` elements start hidden and an IntersectionObserver adds `.visible` (staggered among siblings). Respects `prefers-reduced-motion`.
- **Design tokens** live in `:root` (`--paper`, `--ink`, `--red`, `--blue`, `--wrap: 1300px`, etc.). Base `font-size: 17px`; fluid sizing via `clamp()`.
- **Fonts** (Google Fonts): `Caveat` = `.handwrite`, `Roboto Mono` = `.typewriter`, `Itim` = body, `Oswald` for display/labels; `Abril Fatface`, `Anton`, `Archivo Black`, `Bungee` for the cut-out letters.

## Conventions

- **Vietnamese glyph support is required.** Only use fonts that include Vietnamese accents (Oswald, Roboto Mono, Caveat, Itim, Abril Fatface, Anton, Archivo Black; Bungee is display-only and used solely for "Portfolio"). Avoid Bebas Neue / Special Elite — they lack VN glyphs.
- **No inline code comments** — only the section-banner comments already in the files.
- Use markdown links (not backticks) when referencing files/lines in chat.
- The IDE spell-checker flags Vietnamese names and YouTube IDs as "unknown words" — these are not errors; ignore them.
- Read a file before editing/overwriting it.
