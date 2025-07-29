import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Always use '/' for development, production will be handled by server
  plugins: [
    react(),
    VitePWA({
      disable: process.env.NODE_ENV === 'development', // Disable PWA in development
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
    proxy: {
      '^/(app|api|assets|files|private)': {
        target: 'https://admin.sis.wellspring.edu.vn',
        changeOrigin: true,
        secure: true,
        ws: true,
        // Cải thiện cookie handling cho production backend
        cookieDomainRewrite: {
          'admin.sis.wellspring.edu.vn': 'localhost',
          '.admin.sis.wellspring.edu.vn': 'localhost',
          '.wellspring.edu.vn': 'localhost'
        },
        cookiePathRewrite: {
          '/': '/',
          '/app': '/',
          '/api': '/'
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': 'https://admin.sis.wellspring.edu.vn',
          'Referer': 'https://admin.sis.wellspring.edu.vn/',
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('❌ Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('🚀 Request to Production Backend:', req.method, req.url);
            
            // Ensure proper headers for all requests
            proxyReq.setHeader('Accept', 'application/json');
            if (req.headers['content-type']) {
              proxyReq.setHeader('Content-Type', req.headers['content-type']);
            }
            
            // Add origin header để production backend accept request
            proxyReq.setHeader('Origin', 'https://admin.sis.wellspring.edu.vn');
            proxyReq.setHeader('Referer', 'https://admin.sis.wellspring.edu.vn/');
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('✅ Response from Production:', proxyRes.statusCode, req.url);
            
            // Enhanced cookie processing cho production backend
            if (proxyRes.headers['set-cookie']) {
              console.log('🍪 Original cookies from production:', proxyRes.headers['set-cookie']);
              
              const rewrittenCookies = proxyRes.headers['set-cookie'].map(cookie => {
                let rewritten = cookie
                  // Rewrite all possible domains to localhost
                  .replace(/Domain=admin\.sis\.wellspring\.edu\.vn/gi, 'Domain=localhost')
                  .replace(/Domain=\.admin\.sis\.wellspring\.edu\.vn/gi, 'Domain=localhost')
                  .replace(/Domain=\.wellspring\.edu\.vn/gi, 'Domain=localhost')
                  .replace(/Domain=wellspring\.edu\.vn/gi, 'Domain=localhost')
                  // Remove Secure flag for localhost (no HTTPS)
                  .replace(/;\s*Secure/gi, '')
                  // Set SameSite to Lax for development (None requires Secure)
                  .replace(/SameSite=None/gi, 'SameSite=Lax')
                  .replace(/SameSite=Strict/gi, 'SameSite=Lax')
                  // Ensure path is root
                  .replace(/Path=\/[^;]*/gi, 'Path=/');
                  
                // Ensure SameSite is set if not present
                if (!rewritten.includes('SameSite=')) {
                  rewritten += '; SameSite=Lax';
                }
                
                // Ensure Path is set if not present  
                if (!rewritten.includes('Path=')) {
                  rewritten += '; Path=/';
                }
                
                // Preserve HttpOnly for security
                if (cookie.includes('HttpOnly') && !rewritten.includes('HttpOnly')) {
                  rewritten += '; HttpOnly';
                }
                
                return rewritten;
              });
              
              console.log('🍪 Rewritten cookies for localhost:', rewrittenCookies);
              proxyRes.headers['set-cookie'] = rewrittenCookies;
            }
            
            // Add CORS headers for credentials
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
            proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Frappe-CSRF-Token';
          });
        },
      }
    },
  },
  preview: {
    port: 8080,
    allowedHosts: [
      'parentportal.wellspring.edu.vn',
      'localhost',
      '127.0.0.1'
    ]
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
