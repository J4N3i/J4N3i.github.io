import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CvDownload } from '../CvDownload';
import { cvs } from '@/data/profile';

describe('CvDownload component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders desktop split button with default CV download link and caret button', () => {
    render(<CvDownload variant="nav" />);

    const downloadLink = screen.getByRole('link', { name: /download cv/i });
    expect(downloadLink).toHaveAttribute('href', cvs[0].href);
    expect(downloadLink).toHaveAttribute('download', cvs[0].filename);
    expect(downloadLink).toHaveAttribute('aria-label', `Download CV (${cvs[0].label})`);

    const caretButton = screen.getByRole('button', { name: /choose another cv/i });
    expect(caretButton).toHaveAttribute('aria-expanded', 'false');
    expect(caretButton).toHaveAttribute('aria-controls', 'cv-dropdown-panel');
  });

  it('opens disclosure panel with all CV options on caret button click', () => {
    render(<CvDownload variant="nav" />);
    const caretButton = screen.getByRole('button', { name: /choose another cv/i });

    fireEvent.click(caretButton);
    expect(caretButton).toHaveAttribute('aria-expanded', 'true');

    // Verify all 3 CV options are listed with their labels and descriptions
    cvs.forEach((cv) => {
      expect(screen.getByText(cv.label)).toBeInTheDocument();
      expect(screen.getByText(cv.desc)).toBeInTheDocument();
    });

    // Check "Recommended" badge for default item
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('closes disclosure panel on Escape key and restores focus to caret button', () => {
    render(<CvDownload variant="nav" />);
    const caretButton = screen.getByRole('button', { name: /choose another cv/i });

    fireEvent.click(caretButton);
    expect(caretButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(caretButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(caretButton);
  });

  it('closes disclosure panel on outside pointer click', () => {
    render(
      <div>
        <div data-testid="outside">Outside area</div>
        <CvDownload variant="nav" />
      </div>
    );
    const caretButton = screen.getByRole('button', { name: /choose another cv/i });

    fireEvent.click(caretButton);
    expect(caretButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.pointerDown(screen.getByTestId('outside'));
    expect(caretButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes panel and invokes onItemClick callback when a CV option is selected', () => {
    const onItemClick = vi.fn();
    render(<CvDownload variant="nav" onItemClick={onItemClick} />);
    const caretButton = screen.getByRole('button', { name: /choose another cv/i });

    fireEvent.click(caretButton);

    const generalCvLink = screen.getByText('General').closest('a');
    expect(generalCvLink).toBeInTheDocument();
    fireEvent.click(generalCvLink!);

    expect(caretButton).toHaveAttribute('aria-expanded', 'false');
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it('renders stacked list without caret button in mobile menu variant', () => {
    const onItemClick = vi.fn();
    render(<CvDownload variant="menu" onItemClick={onItemClick} />);

    // Caret button should not be rendered in menu variant
    expect(screen.queryByRole('button', { name: /choose another cv/i })).not.toBeInTheDocument();

    // All 3 items rendered
    cvs.forEach((cv) => {
      const link = screen.getByText(cv.label).closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', cv.href);
      expect(link).toHaveAttribute('download', cv.filename);
      expect(link).toHaveClass('min-h-[44px]');
    });

    expect(screen.getByText('Recommended')).toBeInTheDocument();

    // Clicking an option triggers callback
    const devopsLink = screen.getByText(cvs[0].label).closest('a');
    fireEvent.click(devopsLink!);
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
