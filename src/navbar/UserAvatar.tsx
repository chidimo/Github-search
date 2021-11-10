import clx from 'classnames';
import { useCallback, useState } from 'react';
import { CgChevronDown } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { resetUserLoggedIn } from '../store/login';
import styles from './useravatar.module.scss';

const userName = 'Jane Doe';
const img =
  'https://ui-avatars.com/api/?name=user&background=43489b&color=fff&size=128';

export const UserAvatar = (): JSX.Element => {
  const dispatch = useDispatch();
  const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [ dropdownOpen ]);

  const handleLogout = () => dispatch(resetUserLoggedIn());

  return (
    <div className={styles.avatar_wrapper}>
      <img src={img} alt="avatar" className={styles.avatar} />
      <p
        className={clx([ styles.username ], {
          [styles.wrap_name]: userName.length > 10,
        })}
      >
        {userName}
      </p>
      <span className={styles.dropdown_toggle} onClick={toggleDropdown}>
        <CgChevronDown size={20} />

        <div
          className={clx([ styles.dropdown ], {
            [styles.dropdown_hidden]: dropdownOpen,
          })}
        >
          <span onClick={handleLogout}>Logout</span>
        </div>
      </span>
    </div>
  );
};
