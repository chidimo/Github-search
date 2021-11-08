/* eslint-disable no-console */
import { BsGithub, BsSearch } from 'react-icons/bs';
import { useCallback, useState } from 'react';

import styles from './search.module.scss';

export const SearchPage = (): JSX.Element => {
  const [ search, setSearch ] = useState<string>('');

  const handleSearch = useCallback((event) => {
    event.preventDefault();
    if (search.length === 0) {
      return;
    }
    console.log('Search with query', search);
  }, [ search ]);

  return (
    <div className={styles.search_container}>
      <form action="" onSubmit={handleSearch} className={styles.search_form}>
        <div className={styles.icon_wrapper}>
          <div>
            <BsGithub size={50} />
          </div>
          <p>GitHub</p>
        </div>

        <div className={styles.search_input_wrapper}>
          <label htmlFor="search" className={styles.label}>
            Search
          </label>
          <input
            type="search"
            title="search"
            value={search}
            placeholder='Search ...'
            className={styles.input}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className={styles.search_icon}>
            <BsSearch size={24} />
          </span>
        </div>

        <button type="submit" className={styles.search_button}>
          Search Github
        </button>
      </form>
    </div>
  );
};
