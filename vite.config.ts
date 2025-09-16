import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // 使用相对路径，适合部署在任何路径下
  server: {
    port: 5173,
    host: true
  }
})