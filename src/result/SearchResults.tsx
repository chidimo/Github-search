import { useMemo, useReducer, Reducer, useEffect } from 'react';
import { useNavigate, useSearch } from 'react-location';

import {
  TabTypes,
  DataArrayInterface,
  RepoResultInterface,
  UserResultInterface,
} from './interfaces';
import { formatAsNumber } from '../utils';
import { useSearchRepo, useSearchUsers } from '../shared/queryHooks';
import { ResultCardRepo } from './ResultCardRepo';
import { ResultCardUser } from './ResultCardUser';
import styles from './SearchResults.module.scss';
import { ToggleResultCategory } from './ToggleResultCategory';
import {
  initSearchState,
  searchReducer,
  SearchRepoType,
  SearchReducerType,
  SearchActionType,
  searchUserReducer,
  initSearchUserState,
  SearchUserStateType,
  SearchUserReducerType,
  SearchUserActionType,
} from './reducer';
import { Pagination } from './Pagination';

export const SearchResults = (): JSX.Element => {
  const navigate = useNavigate();
  const { activeTab, after, searchTerm } = useSearch();

  const [ queryVariables, dispatch ] = useReducer<
    Reducer<SearchRepoType, SearchReducerType>
  >(searchReducer, initSearchState);

  const { loading: loadingRepos, data } = useSearchRepo(queryVariables);

  const repo_list =
    data?.search?.edges?.map(
      (edge: { node: RepoResultInterface }) => edge.node
    ) || [];

  const repoCount = data?.search?.repositoryCount;

  const [ userQueryVariables, userDispatch ] = useReducer<
    Reducer<SearchUserStateType, SearchUserReducerType>
  >(searchUserReducer, initSearchUserState);

  const { loading: loadingUsers, data: usersData } =
    useSearchUsers(userQueryVariables);

  const userCount = usersData?.search?.userCount;
  const users_list =
    usersData?.search?.edges?.map(
      (edge: { node: UserResultInterface }) => edge.node
    ) || [];

  const dataArray: DataArrayInterface[] = useMemo(
    () => [
      {
        name: 'Repositories',
        count: repoCount,
        isActive: activeTab === TabTypes.REPO,
        onClick: () =>
          navigate({
            search: (prev: any) => ({
              ...prev,
              after: undefined,
              activeTab: TabTypes.REPO,
            }),
          }),
      },
      {
        name: 'Users',
        count: userCount,
        isActive: activeTab === TabTypes.USERS,
        onClick: () =>
          navigate({
            search: (prev: any) => ({
              ...prev,
              after: undefined,
              activeTab: TabTypes.USERS,
            }),
          }),
      },
    ],
    [ activeTab, data, usersData ]
  );

  useEffect(() => {
    dispatch({
      type: SearchActionType.SET_SEARCH_FILTER,
      payload: {
        after,
        searchTerm,
      },
    });
    userDispatch({
      type: SearchUserActionType.SET_USER_SEARCH,
      payload: {
        after,
        searchTerm,
      },
    });
  }, [ after, searchTerm ]);

  return (
    <div className={styles.search_result_container}>
      <ToggleResultCategory dataArray={dataArray} />

      <div className={styles.search_result_list}>
        {activeTab === TabTypes.REPO && (
          <>
            <h1>{formatAsNumber(repoCount)} Repository results</h1>
            {loadingRepos && <p>Loading repositories</p>}
            {!loadingRepos && repo_list?.length === 0 && (
              <p>Your search did not match any repositories.</p>
            )}

            {repo_list.map((res: RepoResultInterface) => (
              <ResultCardRepo key={res.id} result={res} />
            ))}

            <Pagination
              pageInfo={data?.search?.pageInfo}
              itemCount={data?.search?.edges.length}
            />
          </>
        )}

        {activeTab === TabTypes.USERS && (
          <>
            <h1>{formatAsNumber(userCount)} Users</h1>
            {loadingUsers && <p>Loading users</p>}
            {!loadingUsers && users_list?.length === 0 && (
              <p>Your search did not match any user.</p>
            )}

            {users_list
              .filter((user: UserResultInterface) => Boolean(user.login))
              .map((res: UserResultInterface) => (
                <ResultCardUser key={res.id} result={res} />
              ))}

            <Pagination
              pageInfo={usersData?.search?.pageInfo}
              itemCount={usersData?.search?.edges.length}
            />
          </>
        )}
      </div>
    </div>
  );
};
