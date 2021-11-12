import {
  render,
  screen,
  waitForElementToBeRemoved,
} from './test-utils/render';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('Authentication', () => {
  window.open = jest.fn();

  it('Should login and logout user', async () => {
    render(<App />);
    userEvent.click(screen.getByText(/login to github/i));
    await waitForElementToBeRemoved(() => screen.getByText(/Logging you in./i));
    expect(screen.getByText(/search github/i)).toBeInTheDocument();
    expect(screen.getByText('GithubUserLogin')).toBeInTheDocument();
    userEvent.click(screen.getByText(/logout/i));
    expect(screen.getByText(/login to github/i)).toBeInTheDocument();
  });
});
