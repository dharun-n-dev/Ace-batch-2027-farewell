# OPERATION FAREWELL

A frontend-only farewell site: five CTF challenges → sticker reveals → photo archive, sticker vault and a farewell page.
React + Vite, plain CSS, no backend, no database, no external services.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output in dist/  (upload to Netlify, GitHub Pages, any static host)
npm run preview    # test the production build locally
```
Routing uses `#/hash` URLs and relative asset paths, so `dist/` works on any static host, including sub-folders.
Opening `dist/index.html` straight from disk (file://) will not work because browsers block module scripts there; use a host or `npm run preview`.

---

## What to replace, and where

Everything you will ever change is in **`src/data/`** (text and mappings) and **`src/assets/`** (files). No component code needs touching.

| I want to change… | Edit |
|---|---|
| Titles, taglines, farewell text, flag format, main group photo | `src/data/site.js` |
| The five seniors: name, caption, which sticker, reveal animation, farewell message | `src/data/seniors.js` |
| The five challenges: title, category, difficulty, description, files, hints, flag, which senior | `src/data/challenges.js` |
| Sticker captions / owners / sounds | `src/data/stickers.js` |
| Photo captions, dates, categories, hide a photo | `src/data/gallery.js` |
| Colours, fonts, spacing | `src/styles/designTokens.css` |

### Asset folders (drop files in, they appear automatically)

| Folder | Contents | Notes |
|---|---|---|
| `src/assets/photos/` | `photo-01.jpg … photo-38.jpg` | Shown in the Memory Archive, in filename order. |
| `src/assets/videos/` | `.mp4` / `.webm` (optional) | Shown in the Memory Archive with a play badge. |
| `src/assets/stickers/` | `sticker-01.webp … sticker-48.webp` | Shown in the Sticker Vault. Number = the number on the contact sheets. |
| `src/assets/audio/` | `.mp3` / `.ogg` / `.wav` | Name a file like a sticker (`sticker-17.mp3`) and it is linked automatically. |
| `public/challenge-files/` | downloads for challenges | Link them from `challenges.js` with `files: [{ label, href: 'challenge-files/…' }]`. |

To **replace** a photo or sticker, overwrite the file with the same name. To **add** one, drop it in the folder.

---

## Recipes

**Assign a sticker to a senior** (`src/data/seniors.js`): set `stickerId: 'sticker-17'`.

**Add a meme sound to a sticker**: save it as `src/assets/audio/sticker-17.mp3`. That is all. Or, for any filename, add `'sticker-17': { sound: 'airhorn.mp3' }` in `stickers.js`.

**Put in a real challenge flag.** Flags are stored as SHA-256 hashes, never as plain text:
```bash
npm run hash -- ch-01 "Ac3{the_real_flag}"
# → copy the printed value into flagHash for ch-01 in src/data/challenges.js
```
- The hash includes the challenge `id`, so **don't rename an id after hashing**.
- Case-insensitive? Hash with `--ci` and set `caseSensitive: false`.
- Need custom logic (several valid answers, etc.)? Give the challenge a `validate: (input) => boolean` function instead of `flagHash`.
- Change the flag format in `site.js` (`flagFormat`, `flagPrefix`).

**Remove the placeholder demo flags.** Each placeholder challenge prints its test flag in its description (`DEMO FLAG FOR TESTING`). Delete that line when you add the real description.

**Gate challenges in an order** (all open by default): add `requires: ['ch-01']` to a challenge.

**Hide a photo without deleting it**: add its filename to `galleryExclude` in `gallery.js`. (`photo-32.jpg`, a tiny ~200 px crop, is hidden by default for that reason.)

**Show category filters in the gallery**: give any photo a `category` in `galleryMeta`.

**Change the main farewell photo**: `site.farewell.photo` in `site.js`.

---

## Notes

- **Placeholder data** is currently in `seniors.js` (names `SENIOR ONE`…, stickers `sticker-01…05`) and `challenges.js`. Replace it with the real content.
- **Progress** is stored in `localStorage` (this browser, this device only; it does not sync). The sound on/off choice is kept for the browser session. The Dashboard has a "Reset my progress" button with confirmation. During testing you can also clear it with `localStorage.removeItem('operation-farewell:v1')`.
- **Flag checking is frontend-only.** Hashing keeps flags out of casual view, but anyone who opens dev tools can still find a way to the answer. That is fine for a gift, but it is not a security boundary.
- **Sound** is only played after a click (autoplay rules), one sound at a time, with a mute toggle in the nav and a replay button in the reveal and vault. A missing or unsupported audio file is silently skipped.
- **Fonts** (Cormorant Garamond, DM Sans, IBM Plex Mono) are bundled locally via `@fontsource`, with system fallbacks. Nothing loads from the internet. There is no service worker, so the site is not an installable offline app; it simply needs no network once loaded.
- **Accessibility**: semantic HTML, keyboard-operable dialogs with focus trapping and Escape, visible focus rings, `prefers-reduced-motion` support (reveal shortens and animations are disabled), live regions for feedback.
- **Missing files** show a striped "Missing asset" placeholder with the filename, rather than breaking the page.

## Structure

```
src/
  data/        ← content & mappings (edit these)  site · seniors · challenges · stickers · gallery · assets
  assets/      ← your files                       photos · stickers · audio · videos
  components/  Navbar · ChallengeCard · FlagInput · HintPanel · StickerReveal · Lightbox · PhotoCard · StickerCard · Modal · SoundControl · ProgressBar · SafeImg
  pages/       Landing · ChallengeDashboard · ChallengePage · Finale · MemoryArchive · StickerVault · Farewell
  hooks/       useProgress · useSound · useHashRoute · useReducedMotion
  utils/       flagValidation · sha256 · randomSelection · assetHelpers
  styles/      designTokens.css · globalStyles.css
public/challenge-files/   downloads for challenges
scripts/hash-flag.mjs     flag hashing helper
```
