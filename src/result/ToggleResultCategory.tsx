import clx from 'classnames';

import { formatNumberWithk } from '../utils';
import { DataArrayInterface } from './interfaces';
import styles from './ToggleResultCategory.module.scss';

type ToggleResultCategoryProps = {
  dataArray: DataArrayInterface[];
};

export const ToggleResultCategory = (
  props: ToggleResultCategoryProps
): JSX.Element => {
  const { dataArray } = props;

  return (
    <div className={styles.toggle_category_container}>
      {dataArray.map((data: DataArrayInterface, index: number) => {
        const { name, count, isActive, onClick } = data;

        return (
          <div
            key={index}
            data-testid={name}
            onClick={onClick}
            className={clx([ styles.result_tab ], {
              [styles.active_result_tab]: isActive,
            })}
          >
            <p>{name}</p>
            {count && (
              <p className={styles.result_count}>{formatNumberWithk(count)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
