import { useState, useEffect } from 'react';

const DEFAULT_SECTION_IDS = [
  'home',
  'about',
  'education',
  'experience',
  'skills',
  'projects',
  'certifications',
  'contact',
];

export function useActiveSection(
  sectionIds: string[] = DEFAULT_SECTION_IDS
): [string, (href: string) => void] {
  const [activeHref, setActiveHref] = useState<string>('#home');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveHref(`#${id}`);
        }
      },
      { root: null, threshold: [0.35, 0.5, 0.75] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeHref, setActiveHref];
}
