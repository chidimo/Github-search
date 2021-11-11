import { useQuery, gql } from '@apollo/client';

import {
  SearchReturnInterface,
  SearchUserReturnInterface,
} from '../result/interfaces';
import { SearchRepoType, SearchUserStateType } from '../result/reducer';
import { QUERY_REPO, QUERY_USERS } from './queries';

export const useSearchRepo = ({
  first = 10,
  after = null,
  searchTerm = '',
}: SearchRepoType = {}): SearchReturnInterface => {
  const variables = { first, after, searchTerm };

  const { loading, data, error } = useQuery(gql(QUERY_REPO), {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { loading, data, error };
};

export const useSearchUsers = ({
  first = 10,
  after = null,
  searchTerm = '',
}: SearchUserStateType = {}): SearchUserReturnInterface => {
  const variables = { first, after, searchTerm };

  const { loading, data, error } = useQuery(gql(QUERY_USERS), {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { loading, data, error };
};
