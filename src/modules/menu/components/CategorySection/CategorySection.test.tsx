import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { MenuCategory } from '../../types/menu.types';
import { CategorySection } from './CategorySection';

const category: MenuCategory = {
  id: 'test-category',
  name: 'Roti',
  nameDevanagari: 'रोटी',
  items: [
    { id: 'a', name: 'Roti', nameDevanagari: 'रोटी', diet: 'veg', price: 15 },
    {
      id: 'b',
      name: 'Chicken Cheese Garlic Nan',
      nameDevanagari: 'चिकन चीझ गार्लिक नान',
      diet: 'non-veg',
      price: 80,
    },
  ],
};

describe('CategorySection', () => {
  it('renders all items when the diet filter is "all"', () => {
    render(<CategorySection category={category} dietFilter="all" />);
    expect(screen.getByRole('heading', { name: 'Roti' })).toBeInTheDocument();
    expect(screen.getByText('Chicken Cheese Garlic Nan')).toBeInTheDocument();
  });

  it('filters out items that do not match the diet filter', () => {
    render(<CategorySection category={category} dietFilter="veg" />);
    expect(screen.queryByText('Chicken Cheese Garlic Nan')).not.toBeInTheDocument();
  });

  it('renders nothing when no items match the filter', () => {
    const vegOnly: MenuCategory = { ...category, items: [category.items[1]] };
    const { container } = render(<CategorySection category={vegOnly} dietFilter="veg" />);
    expect(container).toBeEmptyDOMElement();
  });
});
