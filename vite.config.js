import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2020',
    // Raise the warning threshold — large vendor bundles are expected
    chunkSizeWarningLimit: 1500,
    // Enable CSS code splitting for granular caching
    cssCodeSplit: true,
    // Use esbuild minifier (default, fastest)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Fine-grained chunk splitting for maximum cache reuse between deploys
        manualChunks(id) {
          // React core — almost never changes
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'react-core';

          // Chakra UI + Emotion — UI system stable between deploys
          if (id.includes('@chakra-ui') || id.includes('@emotion'))
            return 'chakra';

          // Framer Motion — animations, isolated chunk
          if (id.includes('framer-motion')) return 'framer-motion';

          // i18n — only changes when translations update
          if (id.includes('i18next') || id.includes('react-i18next'))
            return 'i18n';

          // Router
          if (id.includes('react-router')) return 'router';

          // Slick Carousel
          if (id.includes('react-slick') || id.includes('slick-carousel'))
            return 'slider';

          // Icons — usually stable
          if (id.includes('react-icons')) return 'icons';

          // Everything else in node_modules
          if (id.includes('node_modules')) return 'vendor-misc';
        },
      },
    },
  },

  // Pre-bundle dependencies for faster cold-starts in dev
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      'react-router-dom',
      'react-i18next',
      'i18next',
    ],
  },

  // Ensure the dev server serves large assets without choking
  server: {
    fs: { strict: false },
  },
});
