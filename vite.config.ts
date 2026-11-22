import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        privacy: resolve(process.cwd(), 'privacy.html'),
        terms: resolve(process.cwd(), 'terms.html'),
      },
    },
  },
})
