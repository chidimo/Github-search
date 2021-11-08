/* eslint-disable no-console */
import LoginGithub from 'react-login-github';

import { GITHUB_CLIENT_ID } from '../dotEnvSettings';
import styles from './login.module.scss';

export const LoginWithGithub = (): JSX.Element => {
  const onSuccess = (response: any) => console.log('Success', response);
  const onFailure = (response: any) => console.log('Success', response);

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
