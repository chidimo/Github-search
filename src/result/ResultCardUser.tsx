import { UserResultInterface } from './interfaces';
import styles from './ResultCardUser.module.scss';

type ResultCardUserProps = {
  result: UserResultInterface;
};

export const ResultCardUser = (props: ResultCardUserProps): JSX.Element => {
  const { result } = props;
  const { name, about } = result;
  return (
    <div className={styles.result_card_container}>
      <h1>{name}</h1>
      <p>{about}</p>
    </div>
  );
};
