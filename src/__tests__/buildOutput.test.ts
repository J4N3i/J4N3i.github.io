import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL } from '@/data/profile';

describe('Built Output SEO Validation (dist/index.html)', () => {
  const distIndexPath = path.resolve(__dirname, '../../dist/index.html');

  it('verifies dist/index.html exists', () => {
    expect(fs.existsSync(distIndexPath)).toBe(true);
  });

  it('verifies canonical equals SITE_URL in dist/index.html', () => {
    if (!fs.existsSync(distIndexPath)) return;
    const html = fs.readFileSync(distIndexPath, 'utf-8');
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    expect(canonicalMatch).not.toBeNull();
    const canonical = canonicalMatch![1].replace(/\/$/, '');
    expect(canonical).toBe(SITE_URL.replace(/\/$/, ''));
  });

  it('verifies exactly one <h1> in dist/index.html', () => {
    if (!fs.existsSync(distIndexPath)) return;
    const html = fs.readFileSync(distIndexPath, 'utf-8');
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    expect(h1Matches).toHaveLength(1);
  });

  it('verifies <title> length <= 60 characters in dist/index.html', () => {
    if (!fs.existsSync(distIndexPath)) return;
    const html = fs.readFileSync(distIndexPath, 'utf-8');
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    expect(titleMatch).not.toBeNull();
    const title = titleMatch![1].replace(/&amp;/g, '&');
    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it('verifies <meta name="description"> length <= 160 characters in dist/index.html', () => {
    if (!fs.existsSync(distIndexPath)) return;
    const html = fs.readFileSync(distIndexPath, 'utf-8');
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    expect(descMatch).not.toBeNull();
    const desc = descMatch![1].replace(/&amp;/g, '&');
    expect(desc.length).toBeGreaterThan(0);
    expect(desc.length).toBeLessThanOrEqual(160);
  });

  it('verifies valid JSON in every ld+json block in dist/index.html', () => {
    if (!fs.existsSync(distIndexPath)) return;
    const html = fs.readFileSync(distIndexPath, 'utf-8');
    const ldJsonMatches = [
      ...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
    ];
    expect(ldJsonMatches.length).toBeGreaterThanOrEqual(1);

    ldJsonMatches.forEach((match) => {
      expect(() => JSON.parse(match[1].trim())).not.toThrow();
    });
  });

  it('verifies google search console verification file exists in dist and matches public', () => {
    const publicGoogle = path.resolve(__dirname, '../../public/googlea8a0940b3ea72c6a.html');
    const distGoogle = path.resolve(__dirname, '../../dist/googlea8a0940b3ea72c6a.html');
    if (fs.existsSync(publicGoogle)) {
      expect(fs.existsSync(distGoogle)).toBe(true);
      const publicContent = fs.readFileSync(publicGoogle, 'utf-8');
      const distContent = fs.readFileSync(distGoogle, 'utf-8');
      expect(distContent).toBe(publicContent);
      expect(distContent.trim()).toBe('google-site-verification: googlea8a0940b3ea72c6a.html');
    }
  });
});
