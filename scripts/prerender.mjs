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

  const { render, getNoscriptHtml, SITE_URL } = await import(ssrPath);
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

  // Update <noscript>...</noscript> with noscript HTML generated from src/data/profile.ts
  if (typeof getNoscriptHtml === 'function') {
    const noscriptContent = getNoscriptHtml();
    template = template.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptContent);
  }

  fs.writeFileSync(indexPath, template, 'utf-8');
  console.log(
    `[prerender] Prerendered HTML injected into ${indexPath} (${appHtml.length} characters)`
  );

  // Generate sitemap.xml with current ISO date and canonical SITE_URL
  const lastmod = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Main page — highest priority, updated frequently -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`[prerender] Generated sitemap.xml with loc ${SITE_URL}/ and lastmod ${lastmod}`);

  // Clean up dist-ssr
  fs.rmSync(path.resolve(rootDir, 'dist-ssr'), { recursive: true, force: true });
} catch (err) {
  console.error('[prerender] Error during prerender:', err);
  process.exit(1);
}
