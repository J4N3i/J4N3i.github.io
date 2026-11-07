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
    expect(screen.getByTestId('hero-spotlight')).toBeInTheDocument();
    expect(screen.getByTestId('hero-highlight-grid')).toBeInTheDocument();
    expect(screen.getByTestId('hero-vignette')).toBeInTheDocument();

    // Verify drift keyframe classes and static blur-3xl
    const blobPrimary = screen.getByTestId('hero-blob-primary');
    const blobViolet = screen.getByTestId('hero-blob-violet');
    const blobCyan = screen.getByTestId('hero-blob-cyan');

    expect(blobPrimary.className).toContain('hero-drift-a');
    expect(blobPrimary.className).toContain('blur-3xl');
    expect(blobViolet.className).toContain('hero-drift-b');
    expect(blobCyan.className).toContain('hero-drift-c');

    // Verify mobile optimization: blob 3 hidden on small screens, blobs 1 & 2 have smaller mobile sizes
    expect(blobCyan.className).toContain('hidden');
    expect(blobCyan.className).toContain('md:block');
    expect(blobPrimary.className).toContain('max-w-[260px]');
    expect(blobPrimary.className).toContain('md:max-w-[620px]');
    expect(blobViolet.className).toContain('max-w-[240px]');
    expect(blobViolet.className).toContain('md:max-w-[580px]');
  });

  it('fades in on mount via CSS transition', () => {
    const { container } = render(<HeroBackground />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('hero-bg-fade');
    expect(root.className).toContain('opacity-100');
  });
});
