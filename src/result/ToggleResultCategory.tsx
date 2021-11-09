import clx from 'classnames';

import { formatNumberWithk } from '../utils';
import styles from './ToggleResultCategory.module.scss';

type ToggleResultCategoryProps = {
  repo: {
    isActive: boolean;
    count: number;
    onClick: () => void;
  };

  users: {
    isActive: boolean;
    count: number;
    onClick: () => void;
  };
};

export const ToggleResultCategory = (
  props: ToggleResultCategoryProps
): JSX.Element => {
  const { repo, users } = props;

  const dataArray = [
    {
      name: 'Repositories',
      count: repo.count,
      isActive: repo.isActive,
      onClick: repo.onClick,
    },
    {
      name: 'Users',
      count: users.count,
      isActive: users.isActive,
      onClick: users.onClick,
    },
  ];

  return (
    <div className={styles.toggle_category_container}>
      {dataArray.map((data: any, index: number) => {
        const { name, count, isActive, onClick } = data;

        return (
          <div
            key={index}
            onClick={onClick}
            className={clx([styles.result_tab], {
              [styles.active_result_tab]: isActive,
            })}
          >
            <p>{name}</p>
            <p className={styles.result_count}>{formatNumberWithk(count)}</p>
          </div>
        );
      })}
    </div>
  );
};
