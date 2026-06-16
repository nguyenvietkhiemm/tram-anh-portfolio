# CLAUDE.md

Portfolio site for **Phan Trâm Anh** — a Vietnamese video editor. Single-page site that showcases her showreel, experience and selected work for job applications.

## Stack & workflow

- **Vanilla HTML / CSS / JS** — no framework, no build step, no package manager.
- Three source files: `index.html`, `style.css`, `script.js`. Plus `favicon.svg` and `images/`.
- **Preview**: open `index.html` directly in a browser (or any static server). There are no build/test/lint commands.
- **Deploy**: GitHub repo `nguyenvietkhiemm/tram-anh-portfolio`, branch `main`. Commit/push only when the user asks.
- `.gitignore` excludes `*.pdf`, `canva_fetched/`, and OS cruft.

## Aesthetic

Notebook / scrapbook theme on graph-paper: red margin rule, hole punches, polaroid frames, washi tape, rubber stamps, sticky notes, hand-drawn marginalia doodles. Everything is intentionally slightly rotated / imperfect.

## Page structure (`index.html`)

Fixed `#navbar` → `<main>` with sections, then `<footer>`. Section order (kicker numbers + alternating `.page--alt` background follow this order):

- `#hero .page--cover` — ransom-note "Portfolio" title, "Hello!" intro card, polaroid portrait.
- `#projects` (nav label "Work") — project articles (see below). **Comes first after the hero** — the showreel is the headline content.
- `#experience` — experience cards, then **Skills** (`.skills-wrap`: two columns "Editing tools" / "AI tools" split by a dashed vertical divider; each tool is a `.sk-sticker`).
- `#about` — two torn-paper cards (`.card--torn`): About me bio + Education.
- `#certificates` — polaroid + cert cards. (Last section; the `#contact` "Let's talk" section was removed at the user's request — contact details no longer appear on the page.)

### Work projects

- **Monkey Vietnam** (`.proj--monkey`) — current/flagship job. Four series, each a `.proj-row`: a `.hl-grid` spotlight = one **highlight** video (`.film--hl`, red ring + `.film-hl-tag` "★ Highlight") centered, with one dimmed supporting video on each side. Series: Monkey Stories, Kindy Class, Monkey ABC 2D, Mascot AI Max. `monkey_max.png` mascot sits faded in the top-right corner (`.proj-mascot`).
- **"What the Doctor Says"** (MCV Group) — short-form marquee + highlight grid.

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
