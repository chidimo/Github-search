import { useState } from 'react';
import { formatAsNumber } from '../utils';
import {
  RepoResultInterface,
  TabTypes,
  UserResultInterface,
} from './interfaces';
import { ResultCardRepo } from './ResultCardRepo';
import { ResultCardUser } from './ResultCardUser';
import styles from './SearchResults.module.scss';
import { ToggleResultCategory } from './ToggleResultCategory';

const repos: RepoResultInterface[] = [
  {
    id: 0,
    name: 'DrKLO/Telegram',
    description: 'Some random text',
    language: 'javascript',
    stars: 127_000,
    license: 'MIT',
    updated: new Date(),
  },
];

const users: UserResultInterface[] = [
  { id: 0, name: 'chidi', about: 'you too tafia' },
];

export const SearchResults = (): JSX.Element => {
  const [ activeTab, setActiveTab ] = useState<string>(TabTypes.REPO);

  const userCount = 120;
  const repoCount = 492_000;

  return (
    <div className={styles.search_result_container}>
      <ToggleResultCategory
        repo={{
          count: repoCount,
          isActive: activeTab === TabTypes.REPO,
          onClick: () => setActiveTab(TabTypes.REPO),
        }}
        users={{
          count: userCount,
          isActive: activeTab === TabTypes.USERS,
          onClick: () => setActiveTab(TabTypes.USERS),
        }}
      />

      <div className={styles.search_result_list}>
        <div>
          {activeTab === TabTypes.REPO && (
            <h1>{formatAsNumber(repoCount)} repository results</h1>
          )}
          {activeTab === TabTypes.USERS && (
            <h1>{formatAsNumber(userCount)} users</h1>
          )}
        </div>

        {activeTab === TabTypes.REPO &&
          repos.map((res: RepoResultInterface) => {
            return <ResultCardRepo key={res.id} result={res} />;
          })}

        {activeTab === TabTypes.USERS &&
          users.map((res: UserResultInterface) => {
            return <ResultCardUser key={res.id} result={res} />;
          })}
      </div>
    </div>
  );
};
