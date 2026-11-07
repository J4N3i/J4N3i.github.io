import { useState, useEffect } from 'react';

const DEFAULT_SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        }
      },
      { root: null, rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeHref, setActiveHref];
}
