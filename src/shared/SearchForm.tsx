/* eslint-disable no-unused-vars */
import clx from 'classnames';
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
  const isResultPage = current.pathname === '/results';

  const searchOptions = [
    { name: 'Repositories', value: TabTypes.REPO },
    { name: 'Users', value: TabTypes.USERS },
  ];

  const [ search, setSearch ] = useState<string>('');

  const [ selectedOptionIndex, setSelectedOptionIndex ] = useState<number>(0);
  const updateSelectedIndex = useCallback(
    (val) => setSelectedOptionIndex(val),
    []
  );

  const [ showSearchOptions, setShowSearchOptions ] = useState<boolean>(false);
  const showSelector = useCallback(() => setShowSearchOptions(true), []);
  const hideSelector = useCallback(() => setShowSearchOptions(false), []);

  const handleSubmit = useCallback(
    (tab: string) => {
      navigate(`/results?activeTab=${tab}&searchTerm=${search}`);
    },
    [ search ]
  );

  const handleButtonClick = useCallback(
    (e) => {
      e?.preventDefault();
      const activeOption = searchOptions[selectedOptionIndex];
      handleSubmit(activeOption.value);
    },
    [ selectedOptionIndex, search ]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const keyCode = e.code;

      if (isResultPage) {
        return;
      }

      if (keyCode === 'Enter') {
        let activeOption = searchOptions[0];
        if (showSearchOptions) {
          activeOption = searchOptions[selectedOptionIndex];
        }
        handleSubmit(activeOption.value);
        e.preventDefault();
        return;
      }

      if (showSearchOptions && keyCode === 'ArrowUp') {
        let index = 0;
        if (selectedOptionIndex === 0) {
          index = searchOptions.length - 1;
        }
        if (selectedOptionIndex > 0) {
          index = selectedOptionIndex - 1;
        }
        updateSelectedIndex(index);
        e.preventDefault();
        return;
      }

      if (showSearchOptions && keyCode === 'ArrowDown') {
        updateSelectedIndex((selectedOptionIndex + 1) % searchOptions.length);
        return;
      }
    },
    [ selectedOptionIndex, showSearchOptions, search ]
  );

  // Load passed value on mount
  // updates search value from url on the event
  // of a page reload.
  useEffect(() => setSearch(value || ''), []);

  // listen to enter events on search select options
  useEffect(() => {
    const searchOnEnter = (event: KeyboardEvent) => {
      const keyCode = event.code;
      if (keyCode === 'Enter') {
        const target = event.target as HTMLDivElement;
        const tab = target.dataset.active_tab;
        if (tab) {
          navigate(`/results?activeTab=${tab}&searchTerm=${search}`);
        }
      }
    };
    document.addEventListener('keydown', searchOnEnter);
    return () => document.removeEventListener('keydown', searchOnEnter);
  }, [ search ]);

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
          onBlur={() => {
            isResultPage ? undefined : hideSelector();
          }}
          onFocus={isResultPage ? undefined : () => showSelector()}
          className={styles.input}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const { value: searchTerm } = e.target;
            setSearch(searchTerm);
            isResultPage && showSelector();
            onChangeCb && onChangeCb(searchTerm);
          }}
        />
        <span className={styles.search_icon}>
          <BsSearch size={24} />
        </span>

        <div
          data-testid="suggestionBox"
          className={clx([ styles.suggest_options ], {
            [styles.display_none]: isResultPage || !showSearchOptions,
          })}
        >
          {searchOptions.map((option, idx) => {
            return (
              <p
                key={option.value}
                tabIndex={0}
                data-active_tab={option.value}
                onFocus={() => updateSelectedIndex(idx)}
                onClick={() => handleSubmit(option.value)}
                onMouseEnter={() => updateSelectedIndex(idx)}
                className={clx([ styles.option ], {
                  [styles.active_option]: idx === selectedOptionIndex,
                })}
              >
                {option.name}
              </p>
            );
          })}
        </div>
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
