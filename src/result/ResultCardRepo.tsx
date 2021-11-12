import { formatNumberWithk } from '../utils';
import { RepoResultInterface } from './interfaces';
import styles from './ResultCardRepo.module.scss';

type ResultCardProps = {
  result: RepoResultInterface;
};

export const ResultCardRepo = (props: ResultCardProps): JSX.Element => {
  const { result } = props;
  const {
    url,
    nameWithOwner,
    description,
    stargazerCount,
    licenseInfo,
    primaryLanguage,
    updatedAt,
  } = result;
  return (
    <div className={styles.result_card_container}>
      <h1 className='card_title__link'>
        <a href={url}>{nameWithOwner}</a>
      </h1>
      <p>{description}</p>
      <p>
        {formatNumberWithk(stargazerCount)} Stars | {primaryLanguage?.name} |{' '}
        {licenseInfo?.name} | {updatedAt}
      </p>
    </div>
  );
};
