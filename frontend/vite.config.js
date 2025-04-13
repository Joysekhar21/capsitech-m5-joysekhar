import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      "/api":"https://todo-backend-2uxc.onrender.com"
    }
  }
})
