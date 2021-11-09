import { RepoResultInterface } from './interfaces';
import styles from './ResultCard.module.scss';

type ResultCardProps = {
  result: RepoResultInterface;
};

export const ResultCard = (props: ResultCardProps): JSX.Element => {
  const { result } = props;
  const { name, description, stars, license, language, updated } = result;
  return (
    <div className={styles.result_card_container}>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        {stars} Stars | {language} | {license} | {JSON.stringify(updated)}
      </p>
    </div>
  );
};
