import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/frontside-todo',
  plugins: [react()],
  server: {
    proxy: {
      // '/home': backend_url,
    }
  }
})
