import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroBackground } from '../HeroBackground';

describe('HeroBackground', () => {
  it('renders with pointer-events-none and no 3D iframe', () => {
    const { container } = render(<HeroBackground />);

    // Root background element must have pointer-events-none
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.className).toContain('pointer-events-none');

    // No iframe should exist
    const iframe = screen.queryByTitle('3D Particles Background');
    expect(iframe).not.toBeInTheDocument();
  });
});
