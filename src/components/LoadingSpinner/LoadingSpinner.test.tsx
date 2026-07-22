import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('announces a loading status', () => {
    render(<LoadingSpinner label="Fetching menu…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Fetching menu…');
  });
});
