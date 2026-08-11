import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  base: './', // Делает пути к стилям относительными для корректной работы на воркерах
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
})
