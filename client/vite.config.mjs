import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


console.log('✅ Vite config loaded from client/vite.config.js');

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
