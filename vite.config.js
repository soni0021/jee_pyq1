// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with /api/index to index.js on port 5010
      '/api/index': {
        target: 'http://localhost:5011',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/index/, ''),
      },
      
    
      },
    },
  },
)