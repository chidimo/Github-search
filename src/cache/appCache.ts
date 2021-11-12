import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { getLinkChain } from '../cache/links';
import { IS_DEV } from '../dotEnvSettings';

const memoryCache = new InMemoryCache({});

export const appCache: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  resolvers: {},
  cache: memoryCache,
  link: getLinkChain(),
  connectToDevTools: IS_DEV ? true : false,
  defaultOptions: {
    watchQuery: {},
  },
});
