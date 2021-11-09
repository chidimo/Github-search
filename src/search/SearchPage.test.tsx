import { render, screen } from '@testing-library/react';
import { SearchPage } from './SearchPage';


describe('Search page', () => {
  it('renders search page', () => {
    render(<SearchPage />);
    expect(screen.getByText(/search github/i)).toBeInTheDocument();
  });
});
