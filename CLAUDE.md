# CLAUDE.md

Portfolio site for **Phan Trâm Anh** — a Vietnamese video editor. Single-page site that showcases her showreel, experience and selected work for job applications.

## Stack & workflow

- **Vanilla HTML / CSS / JS** — no framework, no build step, no package manager.
- Three source files: `index.html`, `style.css`, `script.js`. Plus `favicon.svg` and `images/` (`avatar.jpg`, `ajc.png`, `monkey_max.png`, `cert-premiere.jpg`; **pending: `mcv-logo.png`** referenced by `.card--mcv`). A separate `lan-chat/` tool is git-ignored and unrelated to the site.
- **Preview**: open `index.html` directly in a browser (or any static server). There are no build/test/lint commands.
- **Deploy**: GitHub repo `nguyenvietkhiemm/tram-anh-portfolio`, branch `main`. Commit/push only when the user asks.
- `.gitignore` excludes `*.pdf`, `canva_fetched/`, and OS cruft.

## Aesthetic

Notebook / scrapbook theme on graph-paper: red margin rule, hole punches, polaroid frames, washi tape, rubber stamps, sticky notes, hand-drawn marginalia doodles. Everything is intentionally slightly rotated / imperfect. Section headings follow the original Canva look — handwritten **Caveat** in **blue** (`.sec-title`, no uppercase); blue (`--blue`) is the accent tone for kickers, dates, project titles.

## Page structure (`index.html`)

Fixed `#navbar` → `<main>` with sections, then `<footer>`. Section order (kicker numbers + alternating `.page--alt` background follow this order):

- `#hero .page--cover` — ransom-note "Portfolio" title, "Hello!" intro card (bio + traits), polaroid portrait.
- `#about` — "About me" section: two `.note-card`s (white paper-note look with a glossy red push-`.note-pin` at top center). **Details** card = DOB, address, email/phone/IG; **Education** card = AJC + GPA + `.note-logo`.
- `#experience` — two `.card--exp` (`.card--monkey` with `.exp-mascot` flat red Max peeking over the top edge; `.card--mcv` with `.exp-logo`), scrapbook decor, then **Skills** (`.skills-wrap`: two columns "Editing tools" / "AI tools" split by a dashed vertical divider; each tool is a `.sk-sticker`).
- `#projects` (nav label "Work") — project articles (see below).
- `#certificates` — polaroid + cert cards (last section).

The old `#contact` "Let's talk" section was removed. Contact details live in the `#about` **Details** note-card and in `.footer-contact` (footer bar) — there is no dedicated Contact section. (The hero once held a consolidated `.about-card` / `.cc-row` block; that was split back out into the `#about` section. Some `.cc-*` / `.contact-card` rules may linger in `style.css` — harmless.) `style.css` still contains some now-unused `.about-grid` / `.contact-*` (the old section) / `.stamp--blue` rules — harmless, kept in case those return.

### Work projects

All project videos sit inside a **browser-window mockup** (`.browser` → `.browser-bar`/`.browser-dot`/`.browser-expand` + `.browser-body`); frames fit the video. `.browser--red` (red bar) for Monkey, default blue for MCV. Each project article has a faint themed line-art **watermark** behind it (`.proj-bg`, `z-index:-1`, opacity .14): Monkey = Max faces + kids-education shapes (red); MCV = medical shapes (blue). Hidden ≤760px.

- **Monkey Vietnam** (`.proj--monkey`) — current/flagship job. Four series rows: a `.hl-grid` (equal 3-col, CSS `order` centers the highlight) = one **highlight** video (`.film--hl`, red ring + `.film-hl-tag` "★ Highlight") with a dimmed supporting video each side. Series: Monkey Stories, Kindy Class, Monkey ABC 2D, Mascot AI Max. `monkey_max.png` mascot faded top-right (`.proj-mascot`).
- **MCV Group** (`.proj--mcv`) — "What the Doctor Says" experience: short-form marquee + centered Highlights grid (`.vid-grid--center`).
- **External Projects** — 2 standalone intro videos (English copy), framed, at the end of the Work section.

## Key implementation details

- **Cut-out title**: each letter is `<span class="ct ct--X">` with its own font, background color, `clip-path`/`border-radius`, rotation and pencil-texture background. `aria-label` on the `<h1>` carries the real word; letters are `aria-hidden`.
- **Video facades**: `.film` buttons carry `data-yt` or `data-drive`; `loadVideo()` in `script.js` swaps the button for an `<iframe>` on click (perf). Thumbnails come from `https://i.ytimg.com/vi/<ID>/hqdefault.jpg`.
- **Progressive enhancement**: an inline script adds `js` to `<html>`; `.js .reveal` elements start hidden and an IntersectionObserver adds `.visible` (staggered among siblings). Respects `prefers-reduced-motion`.
- **Design tokens** live in `:root` (`--paper`, `--ink`, `--red`, `--blue`, `--wrap: 1300px`, etc.). Base `font-size: 17px`; fluid sizing via `clamp()`.
- **Fonts** (Google Fonts): `Caveat` = `.handwrite`, `Roboto Mono` = `.typewriter`, `Itim` = body, `Oswald` for display/labels; `Abril Fatface`, `Anton`, `Archivo Black`, `Bungee` for the cut-out letters.

## Conventions

- **Vietnamese glyph support is required.** Only use fonts that include Vietnamese accents (Oswald, Roboto Mono, Caveat, Itim, Abril Fatface, Anton, Archivo Black; Bungee is display-only and used solely for "Portfolio"). Avoid Bebas Neue / Special Elite — they lack VN glyphs.
- **No inline code comments** — only the section-banner comments already in the files.
- Use markdown links (not backticks) when referencing files/lines in chat.
- The IDE spell-checker flags Vietnamese names and YouTube IDs as "unknown words" — these are not errors; ignore them.
- Read a file before editing/overwriting it.
