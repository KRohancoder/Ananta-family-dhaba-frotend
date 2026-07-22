import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe('Header', () => {
  it('renders the navigation links (desktop nav + mobile nav)', () => {
    renderHeader();
    expect(screen.getAllByRole('navigation', { hidden: true }).length).toBe(2);
    expect(screen.getAllByText('Menu').length).toBeGreaterThan(0);
  });

  it('renders a Reserve a Table call to action', () => {
    renderHeader();
    expect(screen.getAllByText('Reserve a Table').length).toBeGreaterThan(0);
  });
});
