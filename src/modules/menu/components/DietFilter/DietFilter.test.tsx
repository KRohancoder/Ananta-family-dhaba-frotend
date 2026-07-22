import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DietFilter } from './DietFilter';

describe('DietFilter', () => {
  it('marks the active option as checked', () => {
    render(<DietFilter value="veg" onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'Veg' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'All' })).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<DietFilter value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Non-Veg' }));
    expect(onChange).toHaveBeenCalledWith('non-veg');
  });
});
