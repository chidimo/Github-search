/* eslint-disable no-console */
import { useMemo, useState } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import { formatAsNumber } from '../utils';
import {
  DataArrayInterface,
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
    id: '0',
    name: 'DrKLO/Telegram',
    description: 'Some random text',
    updatedAt: '2021-11-10T21:48:36Z',
    primaryLanguage: { name: 'javascript' },
    stargazerCount: 127_000,
    licenseInfo: { name: 'MIT' },
  },
];

const users: UserResultInterface[] = [
  { id: '0', name: 'chidi', bio: 'you too tafia' },
];

export const SearchResults = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(TabTypes.REPO);

  const userCount = 120;
  const repoCount = 492_000;

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
    [activeTab]
  );

  return (
    <div className={styles.search_result_container}>
      <ToggleResultCategory dataArray={dataArray} />

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
          repos.map((res: RepoResultInterface) => (
            <ResultCardRepo key={res.id} result={res} />
          ))}

        {activeTab === TabTypes.USERS &&
          users.map((res: UserResultInterface) => (
            <ResultCardUser key={res.id} result={res} />
          ))}

        <div>
          <span
            className="pointer"
            onClick={() => {
              console.log('Previous');
            }}
          >
            <MdNavigateBefore size={30} />
          </span>
          <span
            className="pointer"
            onClick={() => {
              console.log('Next');
            }}
          >
            <MdNavigateNext size={30} />
          </span>
        </div>
      </div>
    </div>
  );
};
