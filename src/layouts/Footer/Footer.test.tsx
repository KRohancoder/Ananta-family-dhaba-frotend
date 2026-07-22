import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { siteInfo } from '@/shared/constants/site';
import { Footer } from './Footer';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe('Footer', () => {
  it('renders the business name and contact email', () => {
    renderFooter();
    expect(screen.getAllByText(siteInfo.name).length).toBeGreaterThan(0);
    expect(screen.getByText(siteInfo.email)).toBeInTheDocument();
  });

  it('renders a newsletter signup form', () => {
    renderFooter();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });
});
