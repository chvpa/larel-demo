import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Skeletons are captured with the boneyard CLI (see README) instead of the Vite
// plugin — the plugin re-captures on every HMR update and reloads the page.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
