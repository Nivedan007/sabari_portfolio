import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '../dist/client/assets');

// Find the main JavaScript file
let mainJsFile = 'main.js';
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.startsWith('main-') && f.endsWith('.js'));
  if (jsFile) {
    mainJsFile = jsFile;
  }
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Portfolio of Sabari Venkat Raj — Computer Science engineer, full-stack developer building modern web & mobile experiences." />
    <meta name="theme-color" content="#ffffff" />
    <title>Sabari Venkat Raj — Software Developer Portfolio</title>
    <script type="module" crossorigin src="/assets/${mainJsFile}"><\/script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const indexPath = path.join(__dirname, '../dist/client/index.html');
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('✓ Generated dist/client/index.html');

// Also write a top-level index.html (dist/index.html) that points to the client
// assets. Some static hosts (e.g., Vercel) expect the build output at the
// repository's `dist` root — writing this file keeps compatibility.
const topIndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Portfolio of Sabari Venkat Raj — Computer Science engineer, full-stack developer building modern web & mobile experiences." />
    <meta name="theme-color" content="#ffffff" />
    <title>Sabari Venkat Raj — Software Developer Portfolio</title>
    <script type="module" crossorigin src="/client/assets/${mainJsFile}"><\/script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const topIndexPath = path.join(__dirname, '../dist/index.html');
fs.writeFileSync(topIndexPath, topIndexHtml, 'utf-8');
console.log('✓ Generated dist/index.html for hosting compatibility');
