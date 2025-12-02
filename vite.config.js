import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/aihio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        palvelut: resolve(__dirname, 'palvelut.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        tarina: resolve(__dirname, 'tarina.html'),
        yhteystiedot: resolve(__dirname, 'yhteystiedot.html'),
      },
    },
  },
})
