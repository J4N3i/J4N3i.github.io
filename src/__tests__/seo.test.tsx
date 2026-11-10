import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import Index from '@/pages/Index';
import { profile } from '@/data';

describe('SEO & Metadata Verification', () => {
  const htmlPath = path.resolve(__dirname, '../../index.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');

  it('verifies title tag content and optimal SEO character length (under 60 chars)', () => {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    expect(titleMatch).not.toBeNull();
    const title = titleMatch![1].replace(/&amp;/g, '&');

    expect(title).toBe('Janeesha Gamage | Full-Stack & DevOps Engineer');
    // Optimal SEO title length is typically between 30 and 60 characters
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it('verifies meta description content and length (under 160 chars)', () => {
    const expectedDesc =
      'Janeesha Gamage (Janeesha Vishwaprabha): final-year CS undergraduate at SLIIT, open to DevOps & full-stack internships.';

    // Meta description
    const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    expect(descMatch).not.toBeNull();
    const metaDesc = descMatch![1].replace(/&amp;/g, '&');
    expect(metaDesc).toBe(expectedDesc);
    expect(metaDesc.length).toBeLessThanOrEqual(160);

    // OpenGraph description
    const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="(.*?)"/i);
    expect(ogDescMatch).not.toBeNull();
    const ogDesc = ogDescMatch![1].replace(/&amp;/g, '&');
    expect(ogDesc).toBe(expectedDesc);
    expect(ogDesc.length).toBeLessThanOrEqual(160);

    // Twitter description
    const twitterDescMatch = html.match(/<meta\s+name="twitter:description"\s+content="(.*?)"/i);
    expect(twitterDescMatch).not.toBeNull();
    const twitterDesc = twitterDescMatch![1].replace(/&amp;/g, '&');
    expect(twitterDesc).toBe(expectedDesc);
    expect(twitterDesc.length).toBeLessThanOrEqual(160);
  });

  it('verifies OpenGraph and Twitter title and site_name tags', () => {
    const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
    expect(ogTitleMatch).not.toBeNull();
    expect(ogTitleMatch![1].replace(/&amp;/g, '&')).toBe(
      'Janeesha Gamage | Full-Stack & DevOps Engineer'
    );

    const twitterTitleMatch = html.match(/<meta\s+name="twitter:title"\s+content="(.*?)"/i);
    expect(twitterTitleMatch).not.toBeNull();
    expect(twitterTitleMatch![1].replace(/&amp;/g, '&')).toBe(
      'Janeesha Gamage | Full-Stack & DevOps Engineer'
    );

    const siteNameMatch = html.match(/<meta\s+property="og:site_name"\s+content="(.*?)"/i);
    expect(siteNameMatch).not.toBeNull();
    expect(siteNameMatch![1]).toBe('Janeesha Gamage');

    const authorMatch = html.match(/<meta\s+name="author"\s+content="(.*?)"/i);
    expect(authorMatch).not.toBeNull();
    expect(authorMatch![1]).toBe('Janeesha Gamage');
  });

  it('verifies there is exactly one H1 element in the DOM containing "Janeesha Gamage"', () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const h1Elements = screen.getAllByRole('heading', { level: 1, hidden: true });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent(profile.name);
    expect(h1Elements[0]).toHaveTextContent('Janeesha Gamage');
  });

  it('verifies JSON-LD Person and WebSite schema structure and validity', () => {
    const scriptMatches = [
      ...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
    ];
    expect(scriptMatches.length).toBeGreaterThanOrEqual(2);

    const schemas = scriptMatches.map((m) => JSON.parse(m[1].trim()));

    const personSchema = schemas.find((s) => s['@type'] === 'Person');
    expect(personSchema).toBeDefined();
    expect(personSchema.name).toBe('Janeesha Gamage');
    expect(personSchema.alternateName).toEqual(['Janeesha Vishwaprabha']);
    expect(personSchema.url).toBe('https://janeeshagamage.com');
    expect(personSchema.image).toBe('https://janeeshagamage.com/og-preview.png');
    expect(personSchema.jobTitle).toBe('Full-Stack Developer & DevOps Engineer');
    expect(personSchema.description).toBe(
      'Janeesha Gamage (Janeesha Vishwaprabha): final-year CS undergraduate at SLIIT, open to DevOps & full-stack internships.'
    );
    expect(personSchema.alumniOf.name).toBe('Sri Lanka Institute of Information Technology');
    expect(personSchema.sameAs).toContain('https://github.com/J4N3i');
    expect(personSchema.sameAs).toContain('https://www.linkedin.com/in/janeesha-gamage-522717298');

    const websiteSchema = schemas.find((s) => s['@type'] === 'WebSite');
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema.name).toBe('Janeesha Gamage');
    expect(websiteSchema.url).toBe('https://janeeshagamage.com');
  });
});
