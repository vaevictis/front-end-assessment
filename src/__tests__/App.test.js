import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders something', () => {
  render(<App />);
  const title = screen.getByText(/Gist Finder/i);
  expect(title).toBeInTheDocument();
});
