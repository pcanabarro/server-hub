import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Post-build: copy index.html into each server route folder for GitHub Pages SPA routing
    {
      name: 'spa-routes',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'build');
        const indexHtml = path.join(distDir, 'index.html');

        if (!fs.existsSync(indexHtml)) return;

        const html = fs.readFileSync(indexHtml, 'utf-8');

        // Create route folders so GitHub Pages serves the SPA on direct navigation
        const routes = ['pixelmon-web', 'guerra'];
        routes.forEach((route) => {
          const dir = path.join(distDir, route);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, 'index.html'), html);
        });

        // Also create 404.html as a catch-all fallback
        fs.writeFileSync(path.join(distDir, '404.html'), html);
      },
    },
  ],
  build: {
    outDir: 'build',
  },
});
