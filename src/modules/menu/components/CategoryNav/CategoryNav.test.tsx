import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { menuCategories } from '../../data/menuData';
import { CategoryNav } from './CategoryNav';

describe('CategoryNav', () => {
  it('renders a link for every category', () => {
    render(<CategoryNav categories={menuCategories} />);
    expect(screen.getAllByRole('link')).toHaveLength(menuCategories.length);
  });
});
