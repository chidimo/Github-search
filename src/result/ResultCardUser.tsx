import { UserResultInterface } from './interfaces';
import styles from './ResultCardUser.module.scss';

type ResultCardUserProps = {
  result: UserResultInterface;
};

export const ResultCardUser = (props: ResultCardUserProps): JSX.Element => {
  const { result } = props;
  const { name, bio, url } = result;
  return (
    <div className={styles.result_card_container}>
      <h1 className="card_title__link">
        <a href={url}>{name}</a>
      </h1>
      <p>{bio}</p>
    </div>
  );
};
