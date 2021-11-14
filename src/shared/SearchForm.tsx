/* eslint-disable no-unused-vars */
import clx from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useFocus } from '../hooks/useFocus';
import { useNavigate } from 'react-location';
import { TabTypes } from '../result/interfaces';

import styles from './searchform.module.scss';

type SearchFormProps = {
  value?: string;
  onChangeCb?: (...args: any[]) => any;
  handleSubmit?: (...args: any[]) => any;
};

const alphaNumRegex = /[a-zA-Z0-9_]{1}/;

export const SearchForm = (props: SearchFormProps): JSX.Element => {
  const navigate = useNavigate();
  const { value, handleSubmit, onChangeCb } = props;

  const [ search, setSearch ] = useState<string>('');
  const inputRef = useFocus();


  const numOptionsToChooseFrom = 2;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const updateSelectedIndex = useCallback(
    (val) => setSelectedOptionIndex(val),
    []
  );

  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const showOptionsSelector = useCallback(() => setShowSearchOptions(true), []);
  const hideOptionsSelector = useCallback(
    () => setShowSearchOptions(false),
    []
  );

  console.log({ selectedOptionIndex, showSearchOptions });

  // Load passed value on mount
  // updates search value from url on the event
  // of a page reload.
  const handleOptionClick = (option: string) => {
    navigate(`/results?activeTab=${option}&searchTerm=${search}`);
  };

  const handleKeyDown = useCallback(
    (e) => {
      const keyCode = e.code;

      // if (shiftKey && keyCode === 'Enter') {
      //   updateSearch('');
      //   hideOptionsSelector();
      //   return;
      // }

      if (showSearchOptions && keyCode === 'ArrowUp') {
        console.log('arrow', keyCode);
        if (selectedOptionIndex === 0) {
          updateSelectedIndex(numOptionsToChooseFrom - 1);
        }
        if (selectedOptionIndex > 0) {
          updateSelectedIndex(selectedOptionIndex - 1);
        }
        e.preventDefault();
        return;
      }

      if (showSearchOptions && keyCode === 'ArrowDown') {
        updateSelectedIndex((selectedOptionIndex + 1) % numOptionsToChooseFrom);
        return;
      }
    },
    [selectedOptionIndex]
  );

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
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            showOptionsSelector();
            const { value: searchTerm } = e.target;
            setSearch(searchTerm);
            onChangeCb && onChangeCb(searchTerm);
          }}
        />
        <span className={styles.search_icon}>
          <BsSearch size={24} />
        </span>
        <div
          data-testid="suggestionBox"
          className={clx([styles.suggest_options], {
            [styles.display_none]: !showSearchOptions,
          })}
          // style={{
          //   left: `${caretX + 10}px`,
          //   top: `${caretY + 15}px`,
          //   display: showSearchOptions ? 'block' : 'none',
          // }}
        >
          {[
            { name: 'Repos', value: TabTypes.REPO },
            { name: 'Users', value: TabTypes.USERS },
          ].map((option, idx) => {
            return (
              <p
                key={option.value}
                className={clx([styles.option], {
                  [styles.selected_option]: idx === selectedOptionIndex,
                })}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.value}
              </p>
            );
          })}
        </div>
      </div>

      {handleSubmit && (
        <button
          type="submit"
          className={styles.search_button}
          onClick={(e) => {
            e?.preventDefault();
            hideOptionsSelector();
            handleSubmit(search);
          }}
        >
          Search Github
        </button>
      )}
    </form>
  );
};
