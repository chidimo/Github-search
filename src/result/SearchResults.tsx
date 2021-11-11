import { useMemo, useReducer, useState, Reducer, useEffect } from 'react';
import { useSearch } from 'react-location';

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
  const { after, searchTerm } = useSearch();
  const [ activeTab, setActiveTab ] = useState<string>(TabTypes.REPO);

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
        onClick: () => setActiveTab(TabTypes.REPO),
      },
      {
        name: 'Users',
        count: userCount,
        isActive: activeTab === TabTypes.USERS,
        onClick: () => setActiveTab(TabTypes.USERS),
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
        <div>
          {activeTab === TabTypes.REPO && (
            <h1>{formatAsNumber(repoCount)} Repository results</h1>
          )}
          {activeTab === TabTypes.USERS && (
            <h1>{formatAsNumber(userCount)} Users</h1>
          )}
        </div>

        {activeTab === TabTypes.REPO && loadingRepos && (
          <p>Loading repositories</p>
        )}

        {activeTab === TabTypes.REPO &&
          repo_list.map((res: RepoResultInterface) => (
            <ResultCardRepo key={res.id} result={res} />
          ))}

        {activeTab === TabTypes.USERS && loadingUsers && <p>Loading users</p>}

        {activeTab === TabTypes.USERS &&
          users_list.map((res: UserResultInterface) => (
            <ResultCardUser key={res.id} result={res} />
          ))}

        <Pagination
          pageInfo={data?.search?.pageInfo}
          itemCount={data?.search?.edges.length}
        />
      </div>
    </div>
  );
};
