// Resolve a path relative to /public (e.g. challenge downloads) so it works under any base URL.
export const publicUrl = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`;
export const prettyId = (id) => id.replace(/^sticker-0*/, 'No. ');
