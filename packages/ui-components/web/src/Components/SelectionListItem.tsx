import classNames from 'classnames';
import React from 'react';
import styles from '../../statics/styles/selection-list-item.scss';

interface SelectionListItemProps {
  icon?: () => JSX.Element;
  label?: string;
  selected?: boolean;
  children?: React.ElementType;
}

const SelectionListItem: React.FC<SelectionListItemProps> = ({
  icon,
  label,
  selected,
  children,
}) => {
  return (
    <div className={styles.selectionListItem}>
      <div
        className={classNames(styles.selectionListItem_icon, {
          [styles.selectionListItem_icon_selected]: selected,
        })}
      >
        {icon}
      </div>
      {children}
      <div className={styles.selectionListItem_label}>{label}</div>
    </div>
  );
};

export default SelectionListItem;
