import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backend_url = "http://mdalamin19.pythonanywhere.com"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/home': backend_url,
    }
  }
})
