import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Raíz del dominio (Hostinger). GitHub Pages pasa su subcarpeta con --base en predeploy.
  base: '/',
})
