import { useEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseSectionRevealOptions {
  scopeRef: RefObject<HTMLElement | null>;
  animate: (ctx: gsap.Context) => void;
  deps?: DependencyList;
  enabled?: boolean;
}

/**
 * Shared hook that encapsulates GSAP ScrollTrigger reveal logic:
 * - Scoped gsap.context tied to scopeRef
 * - SSR safety check
 * - prefers-reduced-motion check
 * - Automatic revert/cleanup on unmount or deps change
 */
export function useSectionReveal(options: UseSectionRevealOptions): void;
export function useSectionReveal(
  scopeRef: RefObject<HTMLElement | null>,
  animate: (ctx: gsap.Context) => void,
  deps?: DependencyList,
  enabled?: boolean
): void;
export function useSectionReveal(
  scopeOrOptions: RefObject<HTMLElement | null> | UseSectionRevealOptions,
  animateFn?: (ctx: gsap.Context) => void,
  depsList: DependencyList = [],
  isEnabled: boolean = true
): void {
  const isOptionsObject =
    typeof scopeOrOptions === 'object' && scopeOrOptions !== null && 'scopeRef' in scopeOrOptions;

  const scopeRef = isOptionsObject
    ? (scopeOrOptions as UseSectionRevealOptions).scopeRef
    : scopeOrOptions;
  const animate = isOptionsObject
    ? (scopeOrOptions as UseSectionRevealOptions).animate
    : animateFn!;
  const deps = isOptionsObject
    ? ((scopeOrOptions as UseSectionRevealOptions).deps ?? [])
    : depsList;
  const enabled = isOptionsObject
    ? ((scopeOrOptions as UseSectionRevealOptions).enabled ?? true)
    : isEnabled;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    const element = scopeRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      animate(ctx);
    }, element);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}
