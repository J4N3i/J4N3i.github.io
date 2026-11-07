import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillsSection from '@/components/SkillsSection';
import { skillGroups } from '@/data';

describe('SkillsSection', () => {
  it('renders standalone section with id="skills" and scroll-mt-24', () => {
    const { container } = render(<SkillsSection />);

    const section = container.querySelector('#skills');
    expect(section).toBeInTheDocument();
    expect(section?.tagName.toLowerCase()).toBe('section');
    expect(section?.className).toContain('scroll-mt-24');
  });

  it('renders 4 skill groups and their skill pills', () => {
    render(<SkillsSection />);

    for (const group of skillGroups) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
      for (const skill of group.skills) {
        expect(screen.getByText(skill)).toBeInTheDocument();
      }
    }
  });
});
