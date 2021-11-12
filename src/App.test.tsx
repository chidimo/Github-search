import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from './test-utils/render';
import userEvent from '@testing-library/user-event';

import App from './App';
import { formatAsNumber } from './utils';
import { repoSearchResults__page_1 } from './test-utils/repoSearchResults__page_1';
import { repoSearchResults__page_2 } from './test-utils/repoSearchResults__page_2';

describe('Application', () => {
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

  it('Should initiate repo search from search page', async () => {
    const SEARCH_TERM = 'react';
    render(<App />);
    userEvent.click(screen.getByText(/login to github/i));
    await waitForElementToBeRemoved(() => screen.getByText(/Logging you in./i));
    expect(screen.getByText(/search github/i)).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, SEARCH_TERM, { delay: 100 });
    expect(searchInput).toHaveValue(SEARCH_TERM);
    userEvent.click(screen.getByText(/search github/i));

    // this line stays further code execution until our route transition is complete
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Loading repositories/i)
    );

    const repoCount = formatAsNumber(
      repoSearchResults__page_1.search.repositoryCount
    );
    expect(
      screen.getByText(`${repoCount} Repository results`)
    ).toBeInTheDocument();
    repoSearchResults__page_1.search.edges.forEach((edge: any) => {
      expect(screen.getByText(edge.node.nameWithOwner)).toBeInTheDocument();
    });
    // expect previous pagination icon is not visible yet.
    expect(screen.queryByTestId('paginationPrev')).not.toBeInTheDocument();

    // go to next page
    userEvent.click(screen.getByTestId('paginationNext'));
    await waitForElementToBeRemoved(() =>
      screen.getByText(/Loading repositories/i)
    );

    // expect previous pagination icon to now be visible
    expect(screen.getByTestId('paginationPrev')).toBeInTheDocument();

    repoSearchResults__page_2.search.edges.forEach((edge: any) => {
      expect(screen.getByText(edge.node.nameWithOwner)).toBeInTheDocument();
    });
    // screen.debug();
  });
});

