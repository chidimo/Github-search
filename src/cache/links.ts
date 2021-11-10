/* eslint-disable no-console */

import { HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import apolloLogger from 'apollo-link-logger';

import { store } from '../store/store';
import { GRAPHQL_URL } from '../constants';
import { IS_DEV } from '../dotEnvSettings';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = () =>
  setContext((_, { headers }) => {
    const { redux__login_slice } = store.getState();
    const { access_token } = redux__login_slice;

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${access_token}`,
      },
    };
  });

const errorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      const { message } = networkError;

      if (message) {
        console.log(message, {}, { heading: 'Network error' });
      }
    }

    if (graphQLErrors) {
      graphQLErrors.forEach((data) => {
        const { message } = data;
        switch (message) {
          default:
            console.log(message);
            break;
        }
      });
    }
  });

const getLinkChain = ():any => {
  const chain = [ authLink(), errorLink(), httpLink ];
  return from(IS_DEV ? [ apolloLogger, ...chain ] : chain);
};

export { getLinkChain };
