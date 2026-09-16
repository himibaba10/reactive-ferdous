import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

/**
 * Inline CSS into index.html at build time.
 * Removes the render-blocking /assets/index-*.css request (safe at ~8 KiB).
 */
function inlineCriticalCss() {
  return {
    name: 'inline-critical-css',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html

        const cssChunks = Object.values(ctx.bundle).filter(
          (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css')
        )

        if (!cssChunks.length) return html

        const css = cssChunks.map((chunk) => chunk.source).join('\n')
        const cssFileNames = new Set(cssChunks.map((chunk) => chunk.fileName))

        // Drop stylesheet <link> tags for inlined files
        let nextHtml = html.replace(
          /<link[^>]*rel=["']stylesheet["'][^>]*>/g,
          (tag) => {
            const isInlined = [...cssFileNames].some((name) =>
              tag.includes(name)
            )
            return isInlined ? '' : tag
          }
        )

        // Inject CSS before </head>
        nextHtml = nextHtml.replace(
          '</head>',
          `<style>${css}</style>\n</head>`
        )

        // Remove standalone CSS assets from the bundle (avoid orphan files)
        for (const fileName of cssFileNames) {
          delete ctx.bundle[fileName]
        }

        return nextHtml
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inlineCriticalCss(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
})
