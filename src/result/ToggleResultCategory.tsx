import styles from './ToggleResultCategory.module.scss';

type ToggleResultCategoryProps = {
  repoCount: number;
  userCount: number;
};

export const ToggleResultCategory = (
  props: ToggleResultCategoryProps
): JSX.Element => {
  const { repoCount, userCount } = props;
  return (
    <div>
      <div>Repositories {repoCount}</div>
      <div>Users {userCount}</div>
    </div>
  );
};
