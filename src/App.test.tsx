import { render, screen } from '@testing-library/react';
import App from './App';

test('renders github search text', () => {
  render(<App />);
  const linkElement = screen.getByText(/github search/i);
  expect(linkElement).toBeInTheDocument();
});
