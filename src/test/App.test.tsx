import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the AgentFlow heading', () => {
    render(<App />);
    const headings = screen.getAllByText('AgentFlow');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the subtitle', () => {
    render(<App />);
    expect(
      screen.getByText(/Visual builder for composing.*AI agent workflows/),
    ).toBeInTheDocument();
  });

  it('renders the workflow builder section', () => {
    render(<App />);
    expect(screen.getByText('Workflow Builder')).toBeInTheDocument();
  });

  it('renders the node palette', () => {
    render(<App />);
    expect(screen.getByText('Node Palette')).toBeInTheDocument();
  });
});
