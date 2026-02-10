/**
 * Vite Configuration
 * 
 * Build tool configuration for:
 * - Fast development server
 * - Optimized production builds
 * - React plugin for JSX support
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/featured-projects/MWF/',
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
    open: true, // Automatically open browser
  },
})

