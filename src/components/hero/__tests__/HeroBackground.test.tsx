import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HeroBackground } from '../HeroBackground';

describe('HeroBackground', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Default desktop width >= 1024
    window.innerWidth = 1200;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with pointer-events-none on root and iframe to allow unobstructed scrolling', () => {
    const { container } = render(<HeroBackground />);

    // Root background element must have pointer-events-none
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.className).toContain('pointer-events-none');

    // Fast-forward idle callback / setTimeout to trigger Spline loading
    act(() => {
      vi.runAllTimers();
    });

    const iframe = screen.queryByTitle('3D Particles Background');
    if (iframe) {
      expect(iframe.className).toContain('pointer-events-none');
      expect(iframe.parentElement?.className).toContain('pointer-events-none');
      expect(iframe.parentElement?.className).not.toContain('pointer-events-auto');
    }
  });
});
