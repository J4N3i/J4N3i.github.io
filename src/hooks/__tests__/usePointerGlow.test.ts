import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePointerGlow } from '../usePointerGlow';

describe('usePointerGlow', () => {
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: mockDisconnect,
    }));
  });

  it('exits immediately when screen width is under 1024px', () => {
    window.innerWidth = 768;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('pointer: fine'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const container = document.createElement('div');
    const containerRef = { current: container };

    renderHook(() => usePointerGlow(containerRef));
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('exits immediately when prefers-reduced-motion is active', () => {
    window.innerWidth = 1200;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const container = document.createElement('div');
    const containerRef = { current: container };

    renderHook(() => usePointerGlow(containerRef));
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('exits immediately on non-fine pointer (touch devices)', () => {
    window.innerWidth = 1200;
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const container = document.createElement('div');
    const containerRef = { current: container };

    renderHook(() => usePointerGlow(containerRef));
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('initializes CSS variables and observes hero on desktop fine-pointer', () => {
    window.innerWidth = 1200;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('pointer: fine'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const hero = document.createElement('section');
    hero.id = 'home';
    const container = document.createElement('div');
    hero.appendChild(container);
    document.body.appendChild(hero);

    const containerRef = { current: container };

    const { unmount } = renderHook(() => usePointerGlow(containerRef));

    expect(container.style.getPropertyValue('--mx')).toBe('0px');
    expect(container.style.getPropertyValue('--my')).toBe('0px');
    expect(container.style.getPropertyValue('--nx')).toBe('0');
    expect(container.style.getPropertyValue('--ny')).toBe('0');
    expect(container.style.getPropertyValue('--glow')).toBe('0');
    expect(mockObserve).toHaveBeenCalledWith(hero);

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();

    document.body.removeChild(hero);
  });
});
