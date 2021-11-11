import { useQuery, gql } from '@apollo/client';

import { SearchReturnInterface } from '../result/interfaces';
import { SearchRepoType } from '../result/reducer';
import { QUERY_REPO } from './queries';

export const useSearchRepo = ({
  first = 10,
  after = null,
  searchTerm = '',
}: SearchRepoType = {}): SearchReturnInterface => {
  const variables = { first, after, searchTerm };

  const { loading, data, error } = useQuery(gql(QUERY_REPO), {
    variables,
    fetchPolicy:'cache-and-network'
  });

  return { loading, data, error };
};
