import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // important for user site
  build: {
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    // Split heavy, cacheable vendors into their own chunks so the browser can
    // fetch them in parallel and keep them cached across deploys.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          // Framer Motion v12 is split across sibling packages — keep them together.
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion';
          if (/[\\/]react(-dom)?[\\/]|scheduler/.test(id)) return 'react';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('lenis')) return 'lenis';
          return undefined;
        },
      },
    },
  },
})
