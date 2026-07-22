import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ReservationForm } from './ReservationForm';

describe('ReservationForm', () => {
  it('shows validation errors for empty required fields', async () => {
    render(<ReservationForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Request Reservation' }));

    expect(await screen.findByText('Enter your name')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid phone number')).toBeInTheDocument();
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
    expect(screen.getByText('Pick a time')).toBeInTheDocument();
  });

  it('shows a WhatsApp confirmation link after a successful submission', async () => {
    render(<ReservationForm />);

    await userEvent.type(screen.getByLabelText('Name'), 'Rohan Kadam');
    await userEvent.type(screen.getByLabelText('Phone'), '9876543210');
    await userEvent.type(screen.getByLabelText('Date'), '2030-01-15');
    await userEvent.type(screen.getByLabelText('Time'), '07:30PM');
    await userEvent.click(screen.getByRole('button', { name: 'Request Reservation' }));

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Confirm on WhatsApp' })).toBeInTheDocument();
    });
  });
});
