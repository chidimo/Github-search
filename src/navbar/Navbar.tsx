import { Link, useLocation, useSearch } from 'react-location';
import clx from 'classnames';
import { Branding } from '../shared/Branding';
import { SearchForm } from '../shared/SearchForm';
import styles from './navbar.module.scss';
import { UserAvatar } from './UserAvatar';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';

export const Navbar = (): JSX.Element => {
  const { current } = useLocation();
  const { searchTerm } = useSearch();
  const { debouncedSearch } = useDebouncedSearch();

  return (
    <nav
      className={clx([ styles.navbar ], {
        [styles.flex_end]: current.pathname === '/',
      })}
    >
      {current.pathname === '/results' && (
        <>
          <Link to="/" className={styles.link}>
            <Branding hideNameOnSmall={true} addVerticalMargins={false} />
          </Link>
          <SearchForm
            value={searchTerm}
            onChangeCb={(value: string) => debouncedSearch(value)}
          />
        </>
      )}
      <UserAvatar />
    </nav>
  );
};
