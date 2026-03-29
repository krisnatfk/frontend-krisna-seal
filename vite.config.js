import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to fix Windows Registry MIME type corruption causing blank screens
const fixMimeTypesPlugin = () => {
  return {
    name: 'fix-mime-types',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];
        if (url.endsWith('.js') || url.endsWith('.mjs') || url.endsWith('.jsx') || url.endsWith('.ts') || url.endsWith('.tsx')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (url.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        } else if (url.endsWith('.html') || url === '/' || url === '/index.html') {
          res.setHeader('Content-Type', 'text/html');
        } else if (url.endsWith('.svg')) {
          res.setHeader('Content-Type', 'image/svg+xml');
        } else if (url.endsWith('.json')) {
          res.setHeader('Content-Type', 'application/json');
        }
        next();
      });
    }
  };
};

export default defineConfig({
  plugins: [react(), fixMimeTypesPlugin()],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'https://berita-indo-api-next.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
