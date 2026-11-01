// ─────────────────────────────────────────────────────────────
//  THE FIVE SENIORS.
//  stickerId   -> a file in src/assets/stickers (without extension), e.g. 'sticker-17'
//  revealStyle -> 'file' | 'polaroid' | 'stamp' | 'glitch' | 'scrapbook'
//  sound       -> OPTIONAL filename in src/assets/audio. If omitted, the sticker's own sound is used
//                 (an audio file named like the sticker, e.g. sticker-17.mp3, is picked up automatically)
//  message     -> OPTIONAL farewell message shown on the Farewell page ('' = no message)
//
//  ⚠ PLACEHOLDER DATA: replace names, captions and stickerIds with the real ones.
// ─────────────────────────────────────────────────────────────
export const seniors = [
  { id: 'senior-1', name: 'SENIOR ONE',   caption: 'Placeholder caption. Edit it in src/data/seniors.js', stickerId: 'sticker-01', revealStyle: 'file',      sound: '', message: '' },
  { id: 'senior-2', name: 'SENIOR TWO',   caption: 'Placeholder caption. Edit it in src/data/seniors.js', stickerId: 'sticker-02', revealStyle: 'polaroid',  sound: '', message: '' },
  { id: 'senior-3', name: 'SENIOR THREE', caption: 'Placeholder caption. Edit it in src/data/seniors.js', stickerId: 'sticker-03', revealStyle: 'stamp',     sound: '', message: '' },
  { id: 'senior-4', name: 'SENIOR FOUR',  caption: 'Placeholder caption. Edit it in src/data/seniors.js', stickerId: 'sticker-04', revealStyle: 'glitch',    sound: '', message: '' },
  { id: 'senior-5', name: 'SENIOR FIVE',  caption: 'Placeholder caption. Edit it in src/data/seniors.js', stickerId: 'sticker-05', revealStyle: 'scrapbook', sound: '', message: '' },
];

export const getSenior = (id) => seniors.find((s) => s.id === id) || null;
