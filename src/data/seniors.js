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
  { id: 'senior-1', name: 'Asvarden', caption: 'a.k.a Harshavardden', stickerId: 'sticker-44', revealStyle: 'file', sound: '', message: '' },
  { id: 'senior-2', name: 'Dhanvanth', caption: 'a.k.a Cyber anna', stickerId: 'sticker-10', revealStyle: 'polaroid', sound: '', message: '' },
  { id: 'senior-3', name: 'Satvika Gada', caption: 'a.k.a Dhurandhar akka', stickerId: 'sticker-40', revealStyle: 'stamp', sound: '', message: '' },
  { id: 'senior-4', name: 'Shivashaila Shrii', caption: 'a.k.a Networks akka', stickerId: 'sticker-45', revealStyle: 'glitch', sound: '', message: '' },
  { id: 'senior-5', name: 'Someshwar', caption: 'a.k.a OpCon anna', stickerId: 'sticker-04', revealStyle: 'scrapbook', sound: '', message: '' },
];

export const getSenior = (id) => seniors.find((s) => s.id === id) || null;
