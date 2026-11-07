import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutSection from '@/components/AboutSection';
import { aboutData } from '@/data';

describe('AboutSection', () => {
  it('renders about section with id="about" and no longer contains nested id="skills"', () => {
    const { container } = render(<AboutSection />);

    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#skills')).toBeNull();
  });

  it('renders profile image in full colour without grayscale class', () => {
    render(<AboutSection />);

    const img = screen.getByAltText(aboutData.image.alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('src', aboutData.image.src);
    expect(img.className).not.toContain('grayscale');
  });

  it('renders availability pill and 3 recruiter facts', () => {
    render(<AboutSection />);

    expect(screen.getByText(aboutData.statusPill)).toBeInTheDocument();

    for (const fact of aboutData.facts) {
      expect(screen.getAllByText(fact.title).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(fact.subtitle)).toBeInTheDocument();
    }
  });

  it('renders What I Do cards with titles and descriptions', () => {
    render(<AboutSection />);

    for (const item of aboutData.whatIDo) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });
});
