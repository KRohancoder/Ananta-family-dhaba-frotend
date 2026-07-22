import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders the title as a heading', () => {
    render(<SectionHeading title="Our Menu" />);
    expect(screen.getByRole('heading', { name: 'Our Menu' })).toBeInTheDocument();
  });

  it('renders optional eyebrow and description', () => {
    render(
      <SectionHeading
        eyebrow="Fresh Daily"
        title="Our Menu"
        description="Straight off the tawa."
      />,
    );
    expect(screen.getByText('Fresh Daily')).toBeInTheDocument();
    expect(screen.getByText('Straight off the tawa.')).toBeInTheDocument();
  });
});
