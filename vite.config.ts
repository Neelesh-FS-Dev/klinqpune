import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    // GSAP and Lenis are split out so the first route renders without them blocking.
    rollupOptions: {
      output: {
        manualChunks: (id) => (id.includes('gsap') || id.includes('lenis') ? 'motion' : undefined),
      },
    },
  },
})
