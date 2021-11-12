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
import { userSearchResults__page_1 } from './test-utils/userSearchResults__page_1';
import { userSearchResults__page_2 } from './test-utils/userSearchResults__page_2';

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

  it('Should login, search for repo, search for users', async () => {
    const REPO_SEARCH_TERM = 'react';
    const USER_SEARCH_TERM = 'chidi';

    render(<App />);

    // LOGIN
    userEvent.click(screen.getByText(/login to github/i));
    await waitForElementToBeRemoved(() => screen.getByText(/Logging you in./i));
    expect(screen.getByText(/search github/i)).toBeInTheDocument();

    let searchInput = screen.getByPlaceholderText(/search/i);

    await userEvent.type(searchInput, REPO_SEARCH_TERM, { delay: 100 });
    expect(searchInput).toHaveValue(REPO_SEARCH_TERM);
    userEvent.click(screen.getByText(/search github/i));

    // wait until route transition is complete
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

    // expect search input box is persisted from previous page
    expect(searchInput).toHaveValue(REPO_SEARCH_TERM);

    // expect previous pagination icon is not visible yet.
    expect(screen.queryByTestId('paginationPrev')).not.toBeInTheDocument();

    // NEXT PAGE
    userEvent.click(screen.getByTestId('paginationNext'));
    await waitForElementToBeRemoved(() =>
      screen.getByText(/Loading repositories/i)
    );

    // expect previous pagination icon to now be visible
    expect(screen.getByTestId('paginationPrev')).toBeInTheDocument();

    repoSearchResults__page_2.search.edges.forEach((edge: any) => {
      expect(screen.getByText(edge.node.nameWithOwner)).toBeInTheDocument();
    });

    // USERS TAB
    userEvent.click(screen.getByTestId('Users'));

    // pagination icon is not yet visible
    expect(screen.queryByTestId('paginationPrev')).not.toBeInTheDocument();

    searchInput = screen.getByPlaceholderText(/search/i);
    userEvent.clear(searchInput);
    expect(searchInput).toHaveValue('');

    await userEvent.type(searchInput, USER_SEARCH_TERM, { delay: 100 });
    expect(searchInput).toHaveValue(USER_SEARCH_TERM);

    // wait until graphql query resolves
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    // await waitForElementToBeRemoved(() => screen.getByText(/Loading users/i));

    const userCount = formatAsNumber(
      userSearchResults__page_1.search.userCount
    );
    expect(screen.getByText(`${userCount} Users`)).toBeInTheDocument();

    userSearchResults__page_1.search.edges.forEach((edge: any) => {
      expect(screen.getByText(edge.node.login)).toBeInTheDocument();
    });

    // NEXT PAGE
    userEvent.click(screen.getByTestId('paginationNext'));
    await waitForElementToBeRemoved(() => screen.getByText(/Loading users/i));
    userSearchResults__page_2.search.edges.forEach((edge: any) => {
      expect(screen.getByText(edge.node.login)).toBeInTheDocument();
    });

    // screen.debug();
  });
});
