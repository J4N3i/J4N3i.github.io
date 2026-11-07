import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SiteBackground } from '../SiteBackground';

describe('SiteBackground component', () => {
  it('renders a fixed, aria-hidden container with strict containment', () => {
    const { container } = render(<SiteBackground />);
    const root = container.firstElementChild as HTMLElement;

    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveClass('fixed', 'inset-0', 'pointer-events-none');
    expect(root.style.contain).toBe('strict');
  });

  it('renders two static corner glows and faint grid layer', () => {
    const { container } = render(<SiteBackground />);
    const root = container.firstElementChild as HTMLElement;

    // Root should contain 2 glow divs and 1 grid div (3 children)
    expect(root.children.length).toBe(3);
  });
});
