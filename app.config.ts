import { defineConfig } from 'vinxi'
import tsConfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  routers: [
    {
      name: 'public',
      type: 'static',
      dir: './public',
    },
    {
      name: 'ssr',
      type: 'http',
      handler: './app/ssr.tsx',
      target: 'server',
      plugins: () => [TanStackRouterVite(), tsConfigPaths()],
    },
  ],
})
