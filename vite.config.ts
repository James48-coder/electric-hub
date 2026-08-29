import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
    tsconfigPaths()
  ],
  build: {
    target: 'esnext', // Используем современные стандарты для скорости
    minify: 'esbuild', // Максимально быстрая минификация кода
    cssMinify: true, // Сжатие стилей
    rollupOptions: {
      output: {
        manualChunks: {
          // Выделяем тяжелые библиотеки в отдельные файлы, чтобы браузер их кэшировал
          vendor: ['react', 'react-dom', '@tanstack/react-router'],
          icons: ['lucide-react'] 
        }
      }
    }
  }
})
