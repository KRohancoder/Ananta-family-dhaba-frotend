import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Reserve a table</Button>);
    expect(screen.getByRole('button', { name: 'Reserve a table' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Order Now</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Order Now' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Order Now
      </Button>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Order Now' }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
