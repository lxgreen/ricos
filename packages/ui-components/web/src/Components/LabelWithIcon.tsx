import React from 'react';
import styles from '../../statics/styles/label-with-icon.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { InfoIcon } from '..';

export interface LabelWithIconProps {
  label: string;
  tooltipText: string;
  children?: React.ReactElement;
}

const LabelWithIcon: React.FC<LabelWithIconProps> = ({ label, tooltipText, children }) => {
  return (
    <div className={styles.labelWithIcon}>
      <span>{label}</span>
      {children ? (
        <Tooltip content={tooltipText}>{children}</Tooltip>
      ) : (
        <InfoIcon tooltipText={tooltipText} />
      )}
    </div>
  );
};

export default LabelWithIcon;
