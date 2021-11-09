import { Branding } from '../shared/Branding';
import { SearchForm } from '../shared/SearchForm';
import styles from './Navbar.module.scss';
import { UserAvatar } from './UserAvatar';

export const Navbar = (): JSX.Element => {
  return (
    <nav className={styles.navbar}>
      <Branding hideNameOnSmall={true} addVerticalMargins={false} />
      <SearchForm hasSubmitButton={false} />
      <UserAvatar />
    </nav>
  );
};
