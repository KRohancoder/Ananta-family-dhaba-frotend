import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders the page heading and house rules', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'About Anant Family Dhaba' })).toBeInTheDocument();
    expect(screen.getByText(/No smoking/)).toBeInTheDocument();
  });
});
