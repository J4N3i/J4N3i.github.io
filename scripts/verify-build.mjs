import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');
const distIndexPath = path.resolve(distDir, 'index.html');

console.log('[verify-build] Validating BUILT output...');

if (!fs.existsSync(distIndexPath)) {
  console.error(`[verify-build] Error: dist/index.html does not exist at ${distIndexPath}`);
  process.exit(1);
}

const errors = [];

// =============================================================================
// 1. Google Search Console & Public Static Files Verification
// =============================================================================
// Ensure all public/ files (such as google*.html and 404.html) are copied unchanged to dist/
if (fs.existsSync(publicDir)) {
  const publicFiles = fs.readdirSync(publicDir);
  publicFiles.forEach((file) => {
    const publicFilePath = path.resolve(publicDir, file);
    const distFilePath = path.resolve(distDir, file);

    const stat = fs.statSync(publicFilePath);
    if (stat.isFile()) {
      if (!fs.existsSync(distFilePath)) {
        // Fallback safety: copy file if somehow missed
        fs.copyFileSync(publicFilePath, distFilePath);
        console.log(`[verify-build] Copied missing public asset to dist: ${file}`);
      }

      // If it is a Google verification file, ensure its content is completely untouched
      if (file.startsWith('google') && file.endsWith('.html')) {
        const publicContent = fs.readFileSync(publicFilePath, 'utf-8');
        const distContent = fs.readFileSync(distFilePath, 'utf-8');
        if (publicContent !== distContent) {
          errors.push(
            `Google verification file ${file} was modified during build! Content does not match public/${file}`
          );
        } else {
          console.log(`[verify-build] Verified ${file} exists in dist/ and is unmodified.`);
        }
      }
    }
  });
}

// =============================================================================
// 2. SEO Checks for dist/index.html ONLY
// (These checks are strictly scoped to dist/index.html and MUST NEVER run on
// other HTML files such as 404.html or google*.html)
// =============================================================================
const html = fs.readFileSync(distIndexPath, 'utf-8');

// 2a. Expected canonical domain
const EXPECTED_SITE_URL = 'https://www.janeeshagamage.com';

const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
if (!canonicalMatch) {
  errors.push('Missing <link rel="canonical"> tag in dist/index.html');
} else {
  const canonicalHref = canonicalMatch[1].replace(/\/$/, '');
  if (canonicalHref !== EXPECTED_SITE_URL) {
    errors.push(
      `Canonical URL mismatch in dist/index.html: expected "${EXPECTED_SITE_URL}" or "${EXPECTED_SITE_URL}/", got "${canonicalMatch[1]}"`
    );
  }
}

// 2b. Exactly one <h1> (only on main index.html)
const h1Matches = html.match(/<h1[\s>]/gi) || [];
if (h1Matches.length !== 1) {
  errors.push(
    `Single <h1> violation: expected exactly 1 <h1> in dist/index.html, found ${h1Matches.length}`
  );
}

// 2c. <title> <= 60 characters
const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
if (!titleMatch) {
  errors.push('Missing <title> tag in dist/index.html');
} else {
  const title = titleMatch[1].replace(/&amp;/g, '&');
  if (title.length > 60) {
    errors.push(
      `<title> in dist/index.html exceeds 60 characters (${title.length} chars): "${title}"`
    );
  }
  if (title.length === 0) {
    errors.push('<title> in dist/index.html is empty');
  }
}

// 2d. <meta name="description"> <= 160 characters
const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
if (!descMatch) {
  errors.push('Missing <meta name="description"> tag in dist/index.html');
} else {
  const desc = descMatch[1].replace(/&amp;/g, '&');
  if (desc.length > 160) {
    errors.push(
      `<meta name="description"> in dist/index.html exceeds 160 characters (${desc.length} chars): "${desc}"`
    );
  }
  if (desc.length === 0) {
    errors.push('<meta name="description"> in dist/index.html is empty');
  }
}

// 2e. Valid JSON in every ld+json block in dist/index.html
const ldJsonMatches = [
  ...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
];

if (ldJsonMatches.length === 0) {
  errors.push('Missing <script type="application/ld+json"> structured data in dist/index.html');
} else {
  ldJsonMatches.forEach((match, idx) => {
    try {
      JSON.parse(match[1].trim());
    } catch (parseErr) {
      errors.push(`Invalid JSON in dist/index.html ld+json block #${idx + 1}: ${parseErr.message}`);
    }
  });
}

if (errors.length > 0) {
  console.error('[verify-build] Build validation FAILED with the following errors:');
  errors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  process.exit(1);
}

console.log('[verify-build] All dist/index.html SEO & static asset assertions passed successfully!');
