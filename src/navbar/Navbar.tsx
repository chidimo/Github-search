import { useLocation } from 'react-location';
import clx from 'classnames';
import { Branding } from '../shared/Branding';
import { SearchForm } from '../shared/SearchForm';
import styles from './navbar.module.scss';
import { UserAvatar } from './UserAvatar';

export const Navbar = (): JSX.Element => {
  const { current } = useLocation();
  return (
    <nav
      className={clx([ styles.navbar ], {
        [styles.flex_end]: current.pathname === '/',
      })}
    >
      {current.pathname === '/results' && (
        <>
          <Branding hideNameOnSmall={true} addVerticalMargins={false} />
          <SearchForm hasSubmitButton={false} />
        </>
      )}
      <UserAvatar />
    </nav>
  );
};
