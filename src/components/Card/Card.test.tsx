import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Paneer Tikka Masala</Card>);
    expect(screen.getByText('Paneer Tikka Masala')).toBeInTheDocument();
  });
});
