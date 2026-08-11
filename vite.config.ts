import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  base: '/',
  plugins: [
    tanStackRouterVite(),
    react(),
  ],
})
