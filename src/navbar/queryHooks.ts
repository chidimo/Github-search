import { useQuery, gql } from '@apollo/client';
import { AuthUserInterface } from '../result/interfaces';

export const QUERY_AUTH_USER = `
query Username {
  viewer {
    login
    avatarUrl
  }
}`;

export const useGetAuthUser = (): AuthUserInterface => {
  const { data } = useQuery(gql(QUERY_AUTH_USER));
  const login = data?.viewer?.login;
  const avatarUrl = data?.viewer?.avatarUrl;
  return {
    login,
    avatarUrl: avatarUrl
      ? avatarUrl
      : `https://ui-avatars.com/api/?name=${login}&background=43489b&color=fff&size=128`,
  };
};
