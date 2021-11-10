import App from '../App';
import { render, screen } from '../test-utils/render';

describe('Authentication', () => {
  it('renders login button', () => {
    render(<App />);
    expect(screen.getByText(/login to github/i)).toBeInTheDocument();
  });
});
