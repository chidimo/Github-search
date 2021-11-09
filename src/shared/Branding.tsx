import { BsGithub } from 'react-icons/bs';
import clx from 'classnames';

import styles from './branding.module.scss';

type BrandingProps = {
  hideNameOnSmall?: boolean;
  addVerticalMargins?: boolean;
};

export const Branding = (props: BrandingProps): JSX.Element => {
  const { hideNameOnSmall, addVerticalMargins } = props;

  return (
    <div
      className={clx(styles.brand_wrapper, {
        [styles.my_30]: addVerticalMargins,
      })}
    >
      <div>
        <BsGithub size={50} />
      </div>
      <p
        className={clx([ styles.brand_name ], {
          [styles.hide_brand_name]: hideNameOnSmall,
        })}
      >
        GitHub
      </p>
    </div>
  );
};

Branding.defaultProps = {
  hideNameOnSmall: false,
  addVerticalMargins: true,
};
