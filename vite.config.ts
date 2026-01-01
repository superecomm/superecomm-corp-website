import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', '**/*.{png,jpg,jpeg,webp,svg,ico}'],
      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.firebaseapp\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firebase-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: 'Superecomm - AI as a Utility',
        short_name: 'Superecomm',
        description: 'Providing You With AI as a Utility - Enterprise AI Solutions',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'any',
        icons: [
          {
            src: '/icons/icon-72x72.svg',
            sizes: '72x72',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-96x96.svg',
            sizes: '96x96',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-128x128.svg',
            sizes: '128x128',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-144x144.svg',
            sizes: '144x144',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-152x152.svg',
            sizes: '152x152',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-384x384.svg',
            sizes: '384x384',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icons/icon-512x512-maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        categories: ['business', 'productivity', 'utilities'],
        shortcuts: [
          {
            name: 'Home',
            short_name: 'Home',
            description: 'Go to homepage',
            url: '/',
            icons: [{ src: '/icons/icon-192x192.svg', sizes: '192x192' }]
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
})
