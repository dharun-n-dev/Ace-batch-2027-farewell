// ─────────────────────────────────────────────────────────────
//  GALLERY. Every photo in src/assets/photos and video in src/assets/videos appears
//  automatically, in filename order. Nothing is duplicated or generated.
//
//  Optional metadata per file (key = full filename):
//    caption, date, category, alt
//  If ANY item has a category, filter chips appear on the gallery page.
//  `galleryExclude` hides files without deleting them.
// ─────────────────────────────────────────────────────────────
import { photoFiles, videoFiles, natural } from './assets.js';

export const galleryMeta = {
  // 'photo-12.jpg': { caption: 'Farewell night', date: 'Oct 2026', category: 'Farewell' },
};

// photo-32.jpg is a tiny low-resolution crop (≈200px wide) that looks blurry when enlarged.
export const galleryExclude = ['photo-32.jpg'];

const build = (files, type) =>
  Object.keys(files)
    .filter((f) => !galleryExclude.includes(f))
    .sort(natural)
    .map((file, i) => {
      const m = galleryMeta[file] || {};
      return {
        id: file,
        file,
        type,
        src: files[file],
        caption: m.caption || '',
        date: m.date || '',
        category: m.category || '',
        alt: m.alt || m.caption || (type === 'video' ? 'Memory video' : `Memory photograph ${i + 1}`),
      };
    });

export const gallery = [...build(photoFiles, 'image'), ...build(videoFiles, 'video')];
export const getPhotoSrc = (file) => photoFiles[file] || null;
