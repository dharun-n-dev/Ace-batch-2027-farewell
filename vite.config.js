import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + hash routing = works on any static host or sub-folder, no server config.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsInlineLimit: 0 }, // never inline photos/stickers/audio as base64
});
