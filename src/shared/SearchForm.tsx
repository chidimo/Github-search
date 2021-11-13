/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useFocus } from '../hooks/useFocus';

import styles from './searchform.module.scss';

type SearchFormProps = {
  value?: string;
  onChangeCb?: (...args: any[]) => any;
  handleSubmit?: (...args: any[]) => any;
};

export const SearchForm = (props: SearchFormProps): JSX.Element => {
  const { value, handleSubmit, onChangeCb } = props;

  const [ search, setSearch ] = useState<string>('');
  const inputRef = useFocus();

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

      {handleSubmit && (
        <button
          type="submit"
          className={styles.search_button}
          onClick={(e) => {
            e?.preventDefault();
            handleSubmit(search);
          }}
        >
          Search Github
        </button>
      )}
    </form>
  );
};
