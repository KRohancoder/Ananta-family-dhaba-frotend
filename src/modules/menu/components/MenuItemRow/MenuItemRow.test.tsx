import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MenuItemRow } from './MenuItemRow';

describe('MenuItemRow', () => {
  it('renders half/full pricing when both are set', () => {
    render(
      <MenuItemRow
        item={{
          id: 'x',
          name: 'Butter Chicken',
          nameDevanagari: 'बटर चिकन',
          diet: 'non-veg',
          half: 220,
          full: 400,
        }}
      />,
    );
    expect(screen.getByText('₹220 / ₹400')).toBeInTheDocument();
  });

  it('renders a flat price when only price is set', () => {
    render(
      <MenuItemRow
        item={{
          id: 'y',
          name: 'Chana Masala',
          nameDevanagari: 'चना मसाला',
          diet: 'veg',
          price: 160,
        }}
      />,
    );
    expect(screen.getByText('₹160')).toBeInTheDocument();
  });
});
