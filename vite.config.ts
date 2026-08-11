import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  base: './', // Делает все пути к стилям и скриптам относительными
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
})
