import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders children inside a div by default', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content').tagName).toBe('DIV');
  });

  it('renders as the given element', () => {
    render(<Container as="section">Content</Container>);
    expect(screen.getByText('Content').tagName).toBe('SECTION');
  });
});
