import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from '../useActiveSection';

describe('useActiveSection', () => {
  let observerCallback: (entries: IntersectionObserverEntry[]) => void;
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });
  });

  it('initializes with default active href #home', () => {
    const { result } = renderHook(() => useActiveSection());
    expect(result.current[0]).toBe('#home');
  });

  it('observes section elements matching sectionIds when elements exist', () => {
    const dummyDiv = document.createElement('div');
    dummyDiv.id = 'projects';
    document.body.appendChild(dummyDiv);

    renderHook(() => useActiveSection(['home', 'projects']));
    expect(mockObserve).toHaveBeenCalledWith(dummyDiv);

    document.body.removeChild(dummyDiv);
  });

  it('updates active section when an intersecting entry is observed', () => {
    const dummyDiv = document.createElement('div');
    dummyDiv.id = 'projects';
    document.body.appendChild(dummyDiv);

    const { result } = renderHook(() => useActiveSection(['home', 'projects']));

    act(() => {
      observerCallback([
        {
          isIntersecting: true,
          intersectionRatio: 0.8,
          target: dummyDiv,
        } as unknown as IntersectionObserverEntry,
      ]);
    });

    expect(result.current[0]).toBe('#projects');

    document.body.removeChild(dummyDiv);
  });

  it('disconnects observer on unmount when elements are observed', () => {
    const dummyDiv = document.createElement('div');
    dummyDiv.id = 'home';
    document.body.appendChild(dummyDiv);

    const { unmount } = renderHook(() => useActiveSection(['home']));
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();

    document.body.removeChild(dummyDiv);
  });
});
