/* eslint-disable no-console */
import axios from 'axios';

import LoginGithub from 'react-login-github';
import { useDispatch } from 'react-redux';
import { BACKEND_URL } from '../constants';

import { GITHUB_CLIENT_ID } from '../dotEnvSettings';
import { setUserLoggedIn } from '../store/login';
import styles from './login.module.scss';

export const LoginWithGithub = (): JSX.Element => {
  const dispatch = useDispatch();
  const onSuccess = (response: any) => {
    axios
      .post(BACKEND_URL, response)
      .then((res: any) => {
        const { message, data } = res.data;
        if (message === 'success') {
          const { access_token } = data;
          dispatch(setUserLoggedIn(access_token));
        }
      })
      .catch((err) => err);
  };
  const onFailure = (response: any) => console.log('Failure', response);

  return (
    <div className={styles.login_wrapper}>
      <LoginGithub
        clientId={GITHUB_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login to Github"
      />
    </div>
  );
};
