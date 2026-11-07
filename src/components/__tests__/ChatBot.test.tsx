import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatBot from '../ChatBot';

describe('ChatBot component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('does not render when ready is false', () => {
    const { container } = render(<ChatBot ready={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders launcher button with correct accessibility attributes when ready', () => {
    render(<ChatBot ready={true} />);
    const launcher = screen.getByRole('button', { name: /ask thea/i });
    expect(launcher).toBeInTheDocument();
    expect(launcher).toHaveAttribute('aria-expanded', 'false');
    expect(launcher).toHaveAttribute('aria-controls', 'chat-window');
  });

  it('opens dialog on launcher click and renders header, initial message, and chips', () => {
    render(<ChatBot ready={true} />);
    const launcher = screen.getByRole('button', { name: /ask thea/i });
    fireEvent.click(launcher);

    const dialog = screen.getByRole('dialog', { name: 'Chat with Thea' });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'false');

    expect(screen.getByText('Quick answers about Janeesha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear chat/i })).toBeInTheDocument();

    // Check opening message
    expect(
      screen.getByText(/I can answer quick questions about Janeesha's work/i)
    ).toBeInTheDocument();

    // Check chips
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CV' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });

  it('sends chip query immediately on click and displays bot response', async () => {
    render(<ChatBot ready={true} />);
    const launcher = screen.getByRole('button', { name: /ask thea/i });
    fireEvent.click(launcher);

    const projectsChip = screen.getByRole('button', { name: 'Projects' });
    fireEvent.click(projectsChip);

    // User message bubble should appear immediately
    expect(screen.getAllByText('Projects').length).toBeGreaterThanOrEqual(2);

    // Fast forward past typing indicator (300ms)
    act(() => {
      vi.advanceTimersByTime(350);
    });

    // Bot reply should appear
    expect(screen.getByText(/Here are three of Janeesha's featured projects/i)).toBeInTheDocument();
  });

  it('closes dialog on Escape key and returns focus', () => {
    render(<ChatBot ready={true} />);
    const launcher = screen.getByRole('button', { name: /ask thea/i });
    fireEvent.click(launcher);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clears chat back to initial message on Clear chat click', () => {
    render(<ChatBot ready={true} />);
    const launcher = screen.getByRole('button', { name: /ask thea/i });
    fireEvent.click(launcher);

    const cvChip = screen.getByRole('button', { name: 'CV' });
    fireEvent.click(cvChip);

    act(() => {
      vi.advanceTimersByTime(350);
    });

    // Bot CV response should be visible
    expect(screen.getByText(/You can download Janeesha's CV directly/i)).toBeInTheDocument();

    const clearBtn = screen.getByRole('button', { name: /clear chat/i });
    fireEvent.click(clearBtn);

    // Bot CV response should be cleared
    expect(screen.queryByText(/You can download Janeesha's CV directly/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/I can answer quick questions about Janeesha's work/i)
    ).toBeInTheDocument();
  });
});
