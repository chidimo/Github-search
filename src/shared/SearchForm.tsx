import { BsSearch } from 'react-icons/bs';
import { useCallback, useState } from 'react';

import styles from './searchform.module.scss';
import { useNavigate } from 'react-location';
import { TabTypes } from '../result/interfaces';

type SearchFormProps = {
  hasSubmitButton?: boolean;
};

export const SearchForm = (props: SearchFormProps): JSX.Element => {
  const navigate = useNavigate();

  const { hasSubmitButton } = props;

  const [ search, setSearch ] = useState<string>('');

  const handleSubmitSearchPage = useCallback(
    (event) => {
      event?.preventDefault();
      if (search.length === 0) {
        return;
      }
      navigate(`/results?activeTab=${TabTypes.REPO}&searchTerm=${search}`);
    },
    [ search ]
  );

  return (
    <form
      action=""
      onSubmit={handleSubmitSearchPage}
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
          placeholder="Search ..."
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={styles.search_icon}>
          <BsSearch size={24} />
        </span>
      </div>

      {hasSubmitButton && (
        <button
          type="submit"
          className={styles.search_button}
          onClick={handleSubmitSearchPage}
        >
          Search Github
        </button>
      )}
    </form>
  );
};

SearchForm.defaultProps = {
  hasSubmitButton: true,
};
