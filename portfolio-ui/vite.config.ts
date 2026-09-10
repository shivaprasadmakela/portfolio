import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the vendor libraries out of the entry chunk. They change far less
        // often than app code, so a deploy no longer invalidates ~180 kB of cached
        // framework for every visitor.
        // Only split what every page actually needs. react-markdown is
        // deliberately NOT listed: naming it here pulled it into the entry's
        // preload graph, so the home page fetched ~47 kB gzipped of Markdown
        // parser it never uses. Left alone, it ships with the lazy blog route.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
