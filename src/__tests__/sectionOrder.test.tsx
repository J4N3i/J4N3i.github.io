import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { sections, navItems, footerNavItems } from '@/data/navigation';

function isSubsequence<T>(sub: T[], full: T[]): boolean {
  let subIndex = 0;
  for (const item of full) {
    if (item === sub[subIndex]) {
      subIndex += 1;
      if (subIndex === sub.length) return true;
    }
  }
  return subIndex === sub.length;
}

describe('Section Order, Navigation & DOM Hierarchy Integrity', () => {
  it('asserts DOM order of section IDs exactly equals order in src/data/navigation.ts', () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const sectionElements = Array.from(container.querySelectorAll('main#main section[id]'));
    const domSectionIds = sectionElements.map((el) => el.id);
    const expectedSectionIds = sections.map((s) => s.id);

    expect(domSectionIds).toEqual(expectedSectionIds);
    expect(domSectionIds).toEqual([
      'home',
      'about',
      'projects',
      'skills',
      'experience',
      'education',
      'certifications',
      'contact',
    ]);
  });

  it('asserts every nav item href matches an existing section ID in the DOM', () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Check all nav items
    for (const item of navItems) {
      expect(item.href.startsWith('#')).toBe(true);
      const targetId = item.href.slice(1);
      const targetElement = container.querySelector(`section#${targetId}`);
      expect(targetElement).not.toBeNull();
      expect(targetElement?.id).toBe(targetId);
    }

    // Check all footer nav items
    for (const footerItem of footerNavItems) {
      expect(footerItem.href.startsWith('#')).toBe(true);
      const targetId = footerItem.href.slice(1);
      const targetElement = container.querySelector(`section#${targetId}`);
      expect(targetElement).not.toBeNull();
      expect(targetElement?.id).toBe(targetId);
    }
  });

  it('asserts nav order is a strict subsequence of DOM order', () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const sectionElements = Array.from(container.querySelectorAll('main#main section[id]'));
    const domSectionIds = sectionElements.map((el) => el.id);

    const navSectionIds = navItems.map((item) => item.id);
    expect(isSubsequence(navSectionIds, domSectionIds)).toBe(true);

    const footerSectionIds = footerNavItems.map((item) => item.id);
    expect(isSubsequence(footerSectionIds, domSectionIds)).toBe(true);
  });

  it('asserts every section element has scroll-mt-24 for fixed header clearance', () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const sectionElements = Array.from(
      container.querySelectorAll<HTMLElement>('main#main section[id]')
    );
    for (const section of sectionElements) {
      expect(section.className).toContain('scroll-mt-24');
    }
  });
});
