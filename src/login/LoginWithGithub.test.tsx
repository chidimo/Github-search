import { render, screen } from '@testing-library/react';
import {LoginWithGithub} from './LoginWithGithub';

test('renders login button', () => {
  render(<LoginWithGithub />);
  expect(screen.getByText(/login to github/i)).toBeInTheDocument();
});
