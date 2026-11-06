import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const indexPath = path.resolve(distDir, 'index.html');
const ssrPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

try {
  if (!fs.existsSync(indexPath)) {
    throw new Error('dist/index.html not found. Run vite build first.');
  }

  if (!fs.existsSync(ssrPath)) {
    throw new Error('dist-ssr/entry-server.js not found.');
  }

  const { render } = await import(ssrPath);
  const appHtml = render();

  let template = fs.readFileSync(indexPath, 'utf-8');

  // Replace <div id="root"></div> with the rendered HTML
  const rootTag = '<div id="root"></div>';
  if (template.includes(rootTag)) {
    template = template.replace(rootTag, `<div id="root">${appHtml}</div>`);
  } else {
    // In case there's whitespace or attributes
    template = template.replace(
      /<div id="root"[^>]*>([\s\S]*?)<\/div>/,
      `<div id="root">${appHtml}</div>`
    );
  }

  fs.writeFileSync(indexPath, template, 'utf-8');
  console.log(
    `[prerender] Prerendered HTML injected into ${indexPath} (${appHtml.length} characters)`
  );

  // Clean up dist-ssr
  fs.rmSync(path.resolve(rootDir, 'dist-ssr'), { recursive: true, force: true });
} catch (err) {
  console.error('[prerender] Error during prerender:', err);
  process.exit(1);
}
