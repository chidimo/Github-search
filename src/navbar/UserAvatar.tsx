import clx from 'classnames';
import { useCallback, useState } from 'react';
import { CgChevronDown } from 'react-icons/cg';
import { useNavigate } from 'react-location';
import { useDispatch } from 'react-redux';
import { resetUserLoggedIn } from '../store/login';
import { useGetAuthUser } from './queryHooks';
import styles from './useravatar.module.scss';

export const UserAvatar = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login, avatarUrl } = useGetAuthUser();
  const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [ dropdownOpen ]);

  const handleLogout = () => {
    dispatch(resetUserLoggedIn());
    navigate('/');
  };

  return (
    <div className={styles.avatar_wrapper}>
      <img src={avatarUrl} alt="avatar" className={styles.avatar} />
      <p
        className={clx([ styles.username ], {
          [styles.wrap_name]: login?.length > 10,
        })}
      >
        {login}
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
