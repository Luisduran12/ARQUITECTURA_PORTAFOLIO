import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Vendor chunks grandes son esperados y correctos con esta estrategia
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — cambia muy raramente → máxima vida en caché
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'react-core';
          }
          // Chakra UI + Emotion — UI library estable entre deploys
          if (id.includes('@chakra-ui') || id.includes('@emotion')) {
            return 'chakra';
          }
          // Framer Motion — librería de animaciones, separada para invalidación granular
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // i18next — solo cambia si se agregan traducciones
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          // React Router
          if (id.includes('react-router')) {
            return 'router';
          }
          // Slick Carousel + dependencias de slider
          if (id.includes('react-slick') || id.includes('slick-carousel')) {
            return 'slider';
          }
          // Todo lo demás de node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
