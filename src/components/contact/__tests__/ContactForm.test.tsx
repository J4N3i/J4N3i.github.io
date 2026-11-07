import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../ContactForm';
import * as emailLib from '@/lib/email';

vi.mock('@/lib/email', () => ({
  sendContactEmail: vi.fn(),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all fields, labels, topic options and submit button', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /internship opportunity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('validates empty inputs and displays error states without sending email', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
    expect(emailLib.sendContactEmail).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex Smith' } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'not-an-email' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there!' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(emailLib.sendContactEmail).not.toHaveBeenCalled();
  });

  it('successfully submits valid form with selected topic and resets', async () => {
    vi.mocked(emailLib.sendContactEmail).mockResolvedValueOnce({ status: 200, text: 'OK' });

    render(<ContactForm />);

    // Select topic chip
    const topicBtn = screen.getByRole('button', { name: /internship opportunity/i });
    fireEvent.click(topicBtn);
    expect(topicBtn).toHaveAttribute('aria-pressed', 'true');

    // Fill form fields
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const msgInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, { target: { value: 'Recruiter Jane' } });
    fireEvent.change(emailInput, { target: { value: 'jane@techcorp.com' } });
    fireEvent.change(msgInput, { target: { value: 'We would love to discuss a role.' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(emailLib.sendContactEmail).toHaveBeenCalledWith({
        name: 'Recruiter Jane',
        email: 'jane@techcorp.com',
        message: '[Internship opportunity] We would love to discuss a role.',
        toName: expect.any(String),
      });
    });

    expect(await screen.findByText(/message sent!/i)).toBeInTheDocument();
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(msgInput).toHaveValue('');
  });
});
