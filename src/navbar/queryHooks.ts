import { useQuery, gql } from '@apollo/client';

export const QUERY_AUTH_USER = `
query Username {
  viewer {
    login
  }
}`;

export const useGetAuthUser = (): string => {
  const { data } = useQuery(gql(QUERY_AUTH_USER));
  return data?.viewer?.login;
};
