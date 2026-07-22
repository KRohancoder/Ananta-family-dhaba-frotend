import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('renders the hero heading and key CTAs', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { name: 'Anant Family Dhaba' })).toBeInTheDocument();
    expect(screen.getAllByText('View Menu').length).toBeGreaterThan(0);
  });

  it('renders curated menu highlights', () => {
    renderHomePage();
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument();
    expect(screen.getByText('Chicken Khapsa')).toBeInTheDocument();
  });
});
