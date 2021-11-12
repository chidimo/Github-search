import { useCallback } from 'react';
import { useNavigate } from 'react-location';

import styles from './search.module.scss';
import { SearchForm } from '../shared/SearchForm';
import { Branding } from '../shared/Branding';
import { TabTypes } from '../result/interfaces';

export const SearchPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit = useCallback((searchTerm) => {
    if (searchTerm?.length < 1) {
      return;
    }
    navigate(`/results?activeTab=${TabTypes.REPO}&searchTerm=${searchTerm}`);
  }, []);

  return (
    <div className={styles.search_container}>
      <Branding />
      <SearchForm handleSubmit={handleSubmit} />
    </div>
  );
};
