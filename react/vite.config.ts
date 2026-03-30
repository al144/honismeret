// react/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/static/', // EZ A KULCS: így a Django static kiszolgálójával szinkronba kerül
})
