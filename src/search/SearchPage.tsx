import { BsGithub } from 'react-icons/bs';

import styles from './search.module.scss';
import { SearchForm } from '../shared/SearchForm';

export const SearchPage = (): JSX.Element => {
  return (
    <div className={styles.search_container}>
      <div className={styles.icon_wrapper}>
        <div>
          <BsGithub size={50} />
        </div>
        <p>GitHub</p>
      </div>

      <SearchForm />
    </div>
  );
};
