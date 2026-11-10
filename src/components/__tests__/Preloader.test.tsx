import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Preloader from '../Preloader';
import { profile } from '@/data';

describe('Preloader', () => {
  it('renders monogram JG and profile name, with no fake progress bar', () => {
    const onComplete = vi.fn();
    const { container } = render(<Preloader onComplete={onComplete} />);

    expect(screen.getByText('JG')).toBeInTheDocument();
    expect(screen.getByText(profile.name)).toBeInTheDocument();

    // Verify progress bar is removed
    expect(container.querySelector('.h-full.w-full.bg-primary')).not.toBeInTheDocument();
  });

  it('immediately skips intro when a key is pressed', () => {
    const onComplete = vi.fn();
    render(<Preloader onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('immediately skips intro when clicked', () => {
    const onComplete = vi.fn();
    render(<Preloader onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.pointerDown(window);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('completes automatically after timeline finishes', async () => {
    const onComplete = vi.fn();
    render(<Preloader onComplete={onComplete} />);

    await waitFor(
      () => {
        expect(onComplete).toHaveBeenCalled();
      },
      { timeout: 1500 }
    );
  });
});
