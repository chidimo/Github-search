/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-location';

import { BsSearch } from 'react-icons/bs';
import { useFocus } from '../hooks/useFocus';
import { TabTypes } from '../result/interfaces';
import styles from './searchform.module.scss';

type SearchFormProps = {
  value?: string;
  onChangeCb?: (...args: any[]) => any;
};

export const SearchForm = (props: SearchFormProps): JSX.Element => {
  const { value, onChangeCb } = props;

  const inputRef = useFocus();
  const navigate = useNavigate();
  const { current } = useLocation();
  const isSearchPage = current.pathname === '/';

  const [ search, setSearch ] = useState<string>('');

  const handleSubmit = useCallback(
    (tab: string) => {
      navigate(`/results?activeTab=${tab}&searchTerm=${search}`);
    },
    [ search ]
  );

  const handleButtonClick = useCallback(
    (e) => {
      e?.preventDefault();
      handleSubmit(TabTypes.REPO);
    },
    [ search ]
  );

  // Load passed value on mount
  // updates search value from url on the event
  // of a page reload.
  useEffect(() => setSearch(value || ''), []);

  return (
    <form
      action=""
      onSubmit={(e) => e.preventDefault()}
      className={styles.search_form}
    >
      <div className={styles.search_input_wrapper}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>

        <input
          type="search"
          title="search"
          value={search}
          ref={inputRef}
          placeholder="Search"
          className={styles.input}
          onChange={(e) => {
            const { value: searchTerm } = e.target;
            setSearch(searchTerm);
            onChangeCb && onChangeCb(searchTerm);
          }}
        />
        <span className={styles.search_icon}>
          <BsSearch size={24} />
        </span>
      </div>

      {isSearchPage && (
        <button
          type="submit"
          className={styles.search_button}
          onClick={handleButtonClick}
        >
          Search Github
        </button>
      )}
    </form>
  );
};
