export const ANIMATION_EASING = {
  power2Out: 'power2.out',
  power3Out: 'power3.out',
  backOut: 'back.out(1.7)',
  inOut: 'power1.inOut',
} as const;

export const ANIMATION_DURATION = {
  instant: 0.1,
  fast: 0.5,
  normal: 0.8,
  slow: 1.0,
  verySlow: 1.2,
} as const;

export const SCROLL_TRIGGER_POINTS = {
  standard: {
    start: 'top 70%',
    end: 'bottom 30%',
    toggleActions: 'play none none reverse',
  },
  header: {
    start: 'top 80%',
  },
  cards: {
    start: 'top 85%',
  },
  late: {
    start: 'top 90%',
  },
} as const;
