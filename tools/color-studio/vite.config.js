import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/color-studio/',
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: '../../color-studio',
    emptyOutDir: false,
    assetsDir: 'bundle',
    chunkSizeWarningLimit: 900,
  },
});
