import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroBackground } from '../HeroBackground';

describe('HeroBackground', () => {
  it('renders with pointer-events-none, aria-hidden and no 3D iframe', () => {
    const { container } = render(<HeroBackground />);

    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.className).toContain('pointer-events-none');
    expect(root.className).toContain('overflow-hidden');
    expect(root.className).toContain('z-0');
    expect(root).toHaveAttribute('aria-hidden', 'true');

    // Verify no Spline iframe exists
    const iframe = screen.queryByTitle(/particles/i);
    expect(iframe).not.toBeInTheDocument();
  });

  it('renders 4 visual layers: base gradient, blobs, faint grid, and vignette', () => {
    render(<HeroBackground />);

    expect(screen.getByTestId('hero-blob-primary')).toBeInTheDocument();
    expect(screen.getByTestId('hero-blob-violet')).toBeInTheDocument();
    expect(screen.getByTestId('hero-blob-cyan')).toBeInTheDocument();
    expect(screen.getByTestId('hero-grid')).toBeInTheDocument();
    expect(screen.getByTestId('hero-vignette')).toBeInTheDocument();

    // Verify drift keyframe classes and static blur-3xl
    expect(screen.getByTestId('hero-blob-primary').className).toContain('hero-drift-a');
    expect(screen.getByTestId('hero-blob-primary').className).toContain('blur-3xl');
    expect(screen.getByTestId('hero-blob-violet').className).toContain('hero-drift-b');
    expect(screen.getByTestId('hero-blob-cyan').className).toContain('hero-drift-c');
  });

  it('fades in on mount via CSS transition', () => {
    const { container } = render(<HeroBackground />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('hero-bg-fade');
    expect(root.className).toContain('opacity-100');
  });
});
