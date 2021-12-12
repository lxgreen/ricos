import React from 'react';
import styles from '../../statics/styles/settings-panel-header.scss';
import { CloseIcon } from '..';

interface SettingsPanelHeaderProps {
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  showCloseIcon?: boolean;
}

const SettingsPanelHeader: React.FC<SettingsPanelHeaderProps> = ({
  title,
  onClose,
  children,
  showCloseIcon = true,
}) => {
  return (
    <div className={styles.settingsPanelHeader}>
      <div className={styles.settingsPanelHeader_title}>{children || title}</div>
      <div className={styles.settingsPanelHeader_closeIcon}>
        {showCloseIcon && <CloseIcon onClick={onClose} />}
      </div>
    </div>
  );
};

export default SettingsPanelHeader;
