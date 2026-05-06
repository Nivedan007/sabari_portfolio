import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distClientPath = path.join(__dirname, '../dist/client');

export default async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const pathname = url.pathname;

    // Serve assets directly
    if (pathname.startsWith('/assets/')) {
      const assetPath = path.join(distClientPath, pathname);
      const ext = path.extname(assetPath);
      
      const mimeTypes = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
      };

      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      if (['.js', '.css', '.woff', '.woff2'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }

      try {
        const stream = createReadStream(assetPath);
        stream.on('error', () => {
          res.status(404).end('Not Found');
        });
        stream.pipe(res);
        return;
      } catch {
        res.status(404).end('Not Found');
        return;
      }
    }

    // Serve index.html for all other routes (SPA routing)
    const indexPath = path.join(distClientPath, 'index.html');
    const html = await readFile(indexPath, 'utf-8');
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.end(html);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
};
