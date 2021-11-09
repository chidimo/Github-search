import { RepoResultInterface } from './interfaces';
import { ResultCard } from './ResultCard';
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
  {
    id: 2,
    name: 'DrKLO/Telegram',
    description: 'Some random text',
    language: 'python',
    stars: 127_000,
    license: 'MIT',
    updated: new Date(),
  },
  {
    id: 1,
    name: 'DrKLO/Telegram',
    description: 'Some random text',
    language: 'java',
    stars: 127_000,
    license: 'MIT',
    updated: new Date(),
  },
];

export const SearchResults = (): JSX.Element => {
  const repoCount = 492_000;
  const userCount = 120;
  
  return (
    <div>
      <ToggleResultCategory userCount={userCount} repoCount={repoCount} />

      {repos.map((res: RepoResultInterface) => {
        const { id } = res;

        return <ResultCard key={id} result={res} />;
      })}
    </div>
  );
};
