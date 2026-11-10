import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distIndexPath = path.resolve(rootDir, 'dist', 'index.html');

console.log('[verify-build] Validating BUILT output (dist/index.html)...');

if (!fs.existsSync(distIndexPath)) {
  console.error(`[verify-build] Error: dist/index.html does not exist at ${distIndexPath}`);
  process.exit(1);
}

const html = fs.readFileSync(distIndexPath, 'utf-8');
const errors = [];

// 1. Expected canonical domain
const EXPECTED_SITE_URL = 'https://www.janeeshagamage.com';

const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
if (!canonicalMatch) {
  errors.push('Missing <link rel="canonical"> tag in dist/index.html');
} else {
  const canonicalHref = canonicalMatch[1].replace(/\/$/, '');
  if (canonicalHref !== EXPECTED_SITE_URL) {
    errors.push(
      `Canonical URL mismatch: expected "${EXPECTED_SITE_URL}" or "${EXPECTED_SITE_URL}/", got "${canonicalMatch[1]}"`
    );
  }
}

// 2. Exactly one <h1>
const h1Matches = html.match(/<h1[\s>]/gi) || [];
if (h1Matches.length !== 1) {
  errors.push(
    `Single <h1> violation: expected exactly 1 <h1> in dist/index.html, found ${h1Matches.length}`
  );
}

// 3. <title> <= 60 characters
const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
if (!titleMatch) {
  errors.push('Missing <title> tag in dist/index.html');
} else {
  const title = titleMatch[1].replace(/&amp;/g, '&');
  if (title.length > 60) {
    errors.push(
      `<title> exceeds 60 characters (${title.length} chars): "${title}"`
    );
  }
  if (title.length === 0) {
    errors.push('<title> is empty');
  }
}

// 4. <meta name="description"> <= 160 characters
const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
if (!descMatch) {
  errors.push('Missing <meta name="description"> tag in dist/index.html');
} else {
  const desc = descMatch[1].replace(/&amp;/g, '&');
  if (desc.length > 160) {
    errors.push(
      `<meta name="description"> exceeds 160 characters (${desc.length} chars): "${desc}"`
    );
  }
  if (desc.length === 0) {
    errors.push('<meta name="description"> is empty');
  }
}

// 5. Valid JSON in every ld+json block
const ldJsonMatches = [
  ...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
];

if (ldJsonMatches.length === 0) {
  errors.push('Missing <script type="application/ld+json"> structured data');
} else {
  ldJsonMatches.forEach((match, idx) => {
    try {
      JSON.parse(match[1].trim());
    } catch (parseErr) {
      errors.push(`Invalid JSON in ld+json block #${idx + 1}: ${parseErr.message}`);
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

console.log('[verify-build] All dist/index.html SEO & build assertions passed successfully!');

