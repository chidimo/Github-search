import { UserResultInterface } from './interfaces';
import styles from './ResultCardUser.module.scss';

type ResultCardUserProps = {
  result: UserResultInterface;
};

export const ResultCardUser = (props: ResultCardUserProps): JSX.Element => {
  const { result } = props;
  const { login, name, bio, url } = result;
  return (
    <div className={styles.result_card_container}>
      <div className={styles.authuser_display}>
        <h1 className="card_title__link">
          <a href={url}>{login}</a>
        </h1>
        <p className={styles.username}>{name}</p>
      </div>
      <p>{bio}</p>
    </div>
  );
};
