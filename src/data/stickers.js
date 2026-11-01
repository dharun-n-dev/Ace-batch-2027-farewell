// ─────────────────────────────────────────────────────────────
//  STICKERS. Every file in src/assets/stickers appears in the vault automatically.
//  Filenames are sticker-01.webp … sticker-48.webp (the number matches the contact sheets).
//
//  Optional extras per sticker (key = filename without extension):
//    caption  small line under the sticker
//    owner    a senior id (shows their name on the card)
//    sound    filename in src/assets/audio
//  SHORTCUT: an audio file with the same name as the sticker (sticker-17.mp3) is linked automatically.
// ─────────────────────────────────────────────────────────────
import { stickerFiles, audioFiles, natural, stripExt } from './assets.js';
import { seniors } from './seniors.js';

export const stickerOverrides = {
  // 'sticker-17': { caption: 'The Legend', owner: 'senior-1', sound: 'airhorn.mp3' },
};

export const stickers = Object.keys(stickerFiles)
  .sort(natural)
  .map((file) => {
    const id = stripExt(file);
    const o = stickerOverrides[id] || {};
    const autoSound = Object.keys(audioFiles).find((a) => stripExt(a) === id);
    const soundFile = o.sound || autoSound;
    const reveal = seniors.find((s) => s.stickerId === id);
    return {
      id,
      file,
      src: stickerFiles[file],
      caption: o.caption || '',
      owner: o.owner || reveal?.id || null,
      soundSrc: soundFile ? audioFiles[soundFile] || null : null,
    };
  });

export const getSticker = (id) => stickers.find((s) => s.id === id) || null;
