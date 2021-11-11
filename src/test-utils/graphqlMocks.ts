import { gql } from '@apollo/client';
import { QUERY_AUTH_USER } from '../navbar/queryHooks';

export const graphqlMocks = [
  {
    request: {
      query: gql(QUERY_AUTH_USER),
    },
    result: {
      data: {
        viewer: {
          login: 'GithubUserLogin',
          __typename: 'User',
        },
      },
    },
  },
];
