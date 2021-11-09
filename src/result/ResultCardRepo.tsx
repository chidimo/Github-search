import { formatNumberWithk } from '../utils';
import { RepoResultInterface } from './interfaces';
import styles from './ResultCardRepo.module.scss';

type ResultCardProps = {
  result: RepoResultInterface;
};

export const ResultCardRepo = (props: ResultCardProps): JSX.Element => {
  const { result } = props;
  const { name, description, stars, license, language, updated } = result;
  return (
    <div className={styles.result_card_container}>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        {formatNumberWithk(stars)} Stars | {language} | {license} | {JSON.stringify(updated)}
      </p>
    </div>
  );
};
