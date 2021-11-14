import styles from './search.module.scss';
import { SearchForm } from '../shared/SearchForm';
import { Branding } from '../shared/Branding';

export const SearchPage = (): JSX.Element => {
  return (
    <div className={styles.search_container}>
      <Branding />
      <SearchForm />
    </div>
  );
};
