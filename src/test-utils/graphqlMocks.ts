import { gql } from '@apollo/client';
import { QUERY_AUTH_USER } from '../navbar/queryHooks';
import { QUERY_REPO, QUERY_USERS } from '../shared/queries';
import { repoSearchResults__page_1 } from './repoSearchResults__page_1';
import { repoSearchResults__page_2 } from './repoSearchResults__page_2';
import { userSearchResults__page_1 } from './userSearchResults__page_1';
import { userSearchResults__page_2 } from './userSearchResults__page_2';

export const graphqlMocks = [
  {
    request: {
      query: gql(QUERY_AUTH_USER),
    },
    result: {
      data: {
        viewer: {
          login: 'GithubUserLogin',
          avatarUrl: 'some-string',
          __typename: 'User',
        },
      },
    },
  },
  {
    request: {
      query: gql(QUERY_REPO),
      variables: { first: 10, after: null, searchTerm: 'react' },
    },
    result: {
      data: repoSearchResults__page_1,
    },
  },
  {
    request: {
      query: gql(QUERY_REPO),
      variables: { first: 10, after: 'Y3Vyc29yOjEw', searchTerm: 'react' },
    },
    result: {
      data: repoSearchResults__page_2,
    },
  },
  {
    request: {
      query: gql(QUERY_USERS),
      variables: { first: 10, after: null, searchTerm: 'chidi' },
    },
    result: {
      data: userSearchResults__page_1,
    },
  },
  {
    request: {
      query: gql(QUERY_USERS),
      variables: { first: 10, after: 'Y3Vyc29yOjEw', searchTerm: 'chidi' },
    },
    result: {
      data: userSearchResults__page_2,
    },
  },
];
