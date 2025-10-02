import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward API calls during development to the Express API on port 4000
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
});
