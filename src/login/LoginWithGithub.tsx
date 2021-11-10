import axios from 'axios';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import LoginGithub from 'react-login-github';
import { BACKEND_URL } from '../constants';
import { setUserLoggedIn } from '../store/login';
import { GITHUB_CLIENT_ID, IS_TEST } from '../dotEnvSettings';
import { GhResponseInterface } from '../result/interfaces';
import styles from './login.module.scss';
import { useCallback, useState } from 'react';

const loginUser = (
  response: GhResponseInterface,
  dispatch: Dispatch,
  doneCallback: () => void
): void => {
  axios
    .post(BACKEND_URL, response)
    .then((res: any) => {
      const { message, data } = res.data;

      if (message === 'success') {
        const { access_token } = data;
        doneCallback();
        dispatch(setUserLoggedIn(access_token));
      }
    })
    .catch((err) => {
      doneCallback();
      return err;
    });
};

export const LoginWithGithub = (): JSX.Element => {
  const dispatch = useDispatch();

  const [ loginInProgress, setLoginInProgress ] = useState<boolean>(false);
  const startInProgress = useCallback((): void => setLoginInProgress(true), []);
  const endInProgress = useCallback((): void => setLoginInProgress(false), []);

  const onSuccess = (response: GhResponseInterface) =>
    loginUser(response, dispatch, endInProgress);
  const onFailure = (response: any) => response;

  return (
    <div className={styles.login_wrapper}>
      {loginInProgress && <p>Logging you in.</p>}

      {!loginInProgress && (
        <LoginGithub
          clientId={GITHUB_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          onRequest={() => {
            startInProgress();
            if (IS_TEST) {
              loginUser({ code: 'code' }, dispatch, endInProgress);
            }
          }}
          buttonText="Login to Github"
        />
      )}
    </div>
  );
};
