// Auto-discovers everything you drop into src/assets/*. No code change needed to add files.
// Files are keyed by filename, e.g. "photo-12.jpg" -> built URL.
const toMap = (mods) =>
  Object.fromEntries(Object.entries(mods).map(([path, url]) => [path.split('/').pop(), url]));

export const photoFiles = toMap(import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,gif,avif}', { eager: true, query: '?url', import: 'default' }));
export const videoFiles = toMap(import.meta.glob('../assets/videos/*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' }));
export const stickerFiles = toMap(import.meta.glob('../assets/stickers/*.{webp,png,gif}', { eager: true, query: '?url', import: 'default' }));
export const audioFiles = toMap(import.meta.glob('../assets/audio/*.{mp3,ogg,wav,m4a,aac}', { eager: true, query: '?url', import: 'default' }));

export const stripExt = (f) => f.replace(/\.[^.]+$/, '');
export const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true });
