import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // strategies: 'injectManifest',
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'Parent Portal WellSpring',
        short_name: 'PP WellSpring',
        icons: [
          {
            src: 'favicon-32x32.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'android-chrome-192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'android-chrome-512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        // scope: "",
        start_url: '/parent_portal/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    port: 8080,
    proxy: proxyOptions,
  },
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/core/ui/atoms'),
      '@molecules': path.resolve(__dirname, 'src/core/ui/molecules'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@templates': path.resolve(__dirname, 'src/core/ui/templates'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../parent_portal/public/parent_portal',
    emptyOutDir: true,
    target: 'es2015',
  },
})
