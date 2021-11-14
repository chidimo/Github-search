import { formatNumberWithk } from '../utils';
import { RepoResultInterface } from './interfaces';
import styles from './ResultCardRepo.module.scss';
import { parseISO, formatDistanceToNow } from 'date-fns';

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
  const date = updatedAt ? new Date(updatedAt) : new Date();

  const about = [
    `${formatNumberWithk(stargazerCount)} Stars`,
    primaryLanguage ? `${primaryLanguage.name}` : '',
    licenseInfo ? `${licenseInfo.name}` : '',
    `Updated ${formatDistanceToNow(parseISO(date.toISOString()))} ago`,
  ];
  return (
    <div className={styles.result_card_container}>
      <h1 className="card_title__link">
        <a href={url}>{nameWithOwner}</a>
      </h1>
      <p>{description}</p>
      <p>{about.filter((a) => a !== '').join(' | ')}</p>
    </div>
  );
};
