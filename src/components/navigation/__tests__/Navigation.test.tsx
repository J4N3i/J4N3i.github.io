import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../../Navigation';

// Mock GSAP to prevent animation issues in jsdom
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    fromTo: vi.fn(),
  },
}));

describe('Navigation & MobileMenu accessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation with accessible aria-label and links', () => {
    render(<Navigation ready={true} />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const logo = screen.getByRole('link', { name: /janeesha vishwaprabha, back to top/i });
    expect(logo).toHaveAttribute('href', '#home');

    const downloadBtn = screen.getByRole('link', { name: /download cv/i });
    expect(downloadBtn).toHaveAttribute('download');
  });

  it('controls mobile menu with hamburger button aria-expanded and aria-controls', () => {
    render(<Navigation ready={true} />);
    const button = screen.getByRole('button', { name: /open navigation menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'mobile-menu-panel');

    // Open menu
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-label', 'Close navigation menu');

    const panel = document.getElementById('mobile-menu-panel');
    expect(panel).toBeInTheDocument();
  });

  it('closes mobile menu on Escape key and returns focus to hamburger button', () => {
    render(<Navigation ready={true} />);
    const button = screen.getByRole('button', { name: /open navigation menu/i });

    // Open menu
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(button);
  });
});
