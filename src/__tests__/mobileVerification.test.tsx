import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import fs from 'fs';
import path from 'path';

describe('Mobile Optimization Verification (360px - 430px & 768px)', () => {
  beforeEach(() => {
    sessionStorage.setItem('intro-seen', '1');
  });
  it('verifies index.html has viewport-fit=cover, theme-color, and preconnected fonts', () => {
    const htmlPath = path.resolve(__dirname, '../../index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    expect(html).toContain('viewport-fit=cover');
    expect(html).toContain('<meta name="theme-color" content="#0f172a" />');
    expect(html).toContain('rel="preconnect" href="https://fonts.googleapis.com"');
    expect(html).toContain('rel="preconnect" href="https://fonts.gstatic.com" crossorigin');
    expect(html).toContain('family=Inter:wght@400;500;600;700&display=swap');
  });

  it('verifies src/index.css dropped render-blocking @import for fonts and has mobile GPU optimization', () => {
    const cssPath = path.resolve(__dirname, '../index.css');
    const css = fs.readFileSync(cssPath, 'utf-8');

    expect(css).not.toContain('@import url');
    expect(css).toContain('touch-action: manipulation');
    expect(css).toContain('-webkit-tap-highlight-color: transparent');
    expect(css).toContain('overflow-wrap: break-word');
    expect(css).toContain('@media (max-width: 767px)');
  });

  it('verifies hero fold elements on small screens (headline, subtitle, primary CTA, secondary CTA)', () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Headline
    const headline = screen.getByRole('heading', { level: 1, hidden: true });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent(/Janeesha Vishwaprabha/i);

    // Subtitle
    expect(
      screen.getByText(/I build and ship reliable web systems/i, { selector: 'p' })
    ).toBeInTheDocument();

    // Primary CTA
    const primaryCta = screen.getByRole('link', { name: /view my work/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '#projects');

    // Secondary CTA (CV Download)
    const cvButtons = screen.getAllByRole('link', { name: /download cv/i });
    expect(cvButtons.length).toBeGreaterThanOrEqual(1);

    // Availability badge
    expect(screen.getAllByText(/Open to DevOps & full-stack internships/i)[0]).toBeInTheDocument();
  });

  it('verifies below-the-fold images have width, height, loading=lazy, and decoding=async', () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThanOrEqual(3);

    images.forEach((img) => {
      expect(img).toHaveAttribute('width');
      expect(img).toHaveAttribute('height');
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('decoding', 'async');
    });

    // Profile photo has responsive srcset and sizes
    const profileImg = container.querySelector('img[alt*="Janeesha Vishwaprabha"]');
    expect(profileImg).not.toBeNull();
    expect(profileImg).toHaveAttribute('srcset');
    expect(profileImg?.getAttribute('srcset')).toContain('profile-480.jpg');
    expect(profileImg?.getAttribute('srcset')).toContain('profile-800.jpg');
    expect(profileImg).toHaveAttribute('sizes');
  });

  it('verifies contact form mobile inputs have 16px font and correct autocomplete/inputmode', () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/your name/i);
    expect(nameInput).toHaveAttribute('autocomplete', 'name');
    expect(nameInput.className).toContain('text-base');

    const emailInput = screen.getAllByLabelText(/email/i)[0];
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('inputmode', 'email');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');
    expect(emailInput.className).toContain('text-base');

    const messageInput = screen.getByLabelText(/message/i);
    expect(messageInput).toHaveAttribute('enterkeyhint', 'send');
    expect(messageInput.className).toContain('text-base');
  });

  it('verifies minimum touch targets across critical interactive elements', () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Chatbot launcher (48px)
    const launcher = screen.getByRole('button', { name: /ask thea/i });
    expect(launcher.className).toContain('h-12');
    expect(launcher.className).toContain('w-12');

    // Mobile nav hamburger toggle
    const menuToggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuToggle.className).toContain('min-h-[44px]');
    expect(menuToggle.className).toContain('min-w-[44px]');
  });
});
