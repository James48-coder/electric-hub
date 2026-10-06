import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Игнорируем папку api и старые файлы бэкенда, чтобы роутер не сходил с ума
    TanStackRouterVite({
      routesDirectory: './src/routes',
      routeFileIgnorePattern: '.((css|style|template|test|spec)|(api/.*|ping|auth)).(ts|tsx|js|jsx)' 
    }),
    react(),
    tsconfigPaths()
  ],
  build: {
    target: 'esnext', 
    minify: 'esbuild', 
    cssMinify: true, 
    chunkSizeWarningLimit: 1000, // Увеличиваем лимит размера файла, чтобы Timeweb не ругался
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-router'],
          icons: ['lucide-react'] 
        }
      }
    }
  }
})
