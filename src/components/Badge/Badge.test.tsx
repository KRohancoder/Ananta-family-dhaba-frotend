import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label text', () => {
    render(<Badge tone="veg">Veg</Badge>);
    expect(screen.getByText('Veg')).toBeInTheDocument();
  });
});
