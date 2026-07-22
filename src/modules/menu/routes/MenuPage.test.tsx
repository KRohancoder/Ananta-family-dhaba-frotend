import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MenuPage } from './MenuPage';

function renderMenuPage() {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <MenuPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('MenuPage', () => {
  it('renders menu categories once loaded', async () => {
    renderMenuPage();
    expect(await screen.findByRole('heading', { name: 'Chicken Main Course' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Roti' })).toBeInTheDocument();
  });

  it('filters items by diet', async () => {
    renderMenuPage();
    await screen.findByRole('heading', { name: 'Roti' });

    expect(screen.getByText('Chicken Cheese Garlic Nan')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('radio', { name: 'Veg' }));

    await waitFor(() => {
      expect(screen.queryByText('Chicken Cheese Garlic Nan')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Roti', { selector: 'p' })).toBeInTheDocument();
  });
});
