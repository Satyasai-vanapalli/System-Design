import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this project from a repository subpath.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/System-Design/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true }, '/oauth2': { target: 'http://localhost:8080' } },
  },
})

