import { useQuery, gql } from '@apollo/client';

export const useGetAuthUser = (): string => {
  const QUERY = `
  query Username {
    viewer {
      login
    }
  }`;

  const { data } = useQuery(gql(QUERY));
  return data?.viewer?.login;
};
