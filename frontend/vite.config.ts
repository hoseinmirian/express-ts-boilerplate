import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/app/', // Important if you're serving from /app route
  build: {
    manifest: true,
    rollupOptions: {
      input: 'index.html'
    },
    outDir: '../public/client' // Output outside the frontend folder
  }
})
