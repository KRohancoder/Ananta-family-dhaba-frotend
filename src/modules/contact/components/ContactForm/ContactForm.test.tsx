import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('shows validation errors for empty required fields', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Enter your name')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid phone number')).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText('Name'), 'Rohan Kadam');
    await userEvent.type(screen.getByLabelText('Phone'), '9876543210');
    await userEvent.type(screen.getByLabelText('Message'), 'Do you take large group bookings?');
    await userEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(screen.getByText("Thanks! We'll get back to you soon.")).toBeInTheDocument();
    });
  });
});
