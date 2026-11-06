import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { profile } from '@/data';

describe('Portfolio Smoke Test', () => {
  it('renders Index page without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Verify main hero headline includes profile name
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(container.textContent).toContain(profile.name);

    // Verify navigation is rendered
    expect(screen.getAllByRole('navigation')[0]).toBeInTheDocument();

    // Verify key sections exist
    expect(document.getElementById('home')).toBeInTheDocument();
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(document.getElementById('projects')).toBeInTheDocument();
    expect(document.getElementById('experience')).toBeInTheDocument();
    expect(document.getElementById('education')).toBeInTheDocument();
    expect(document.getElementById('certifications')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
  });
});
