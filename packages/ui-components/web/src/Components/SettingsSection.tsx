import type { HTMLAttributes } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-section.scss';

interface SettingsSectionProps {
  className?: string;
  theme: RichContentTheme;
  ariaProps?: HTMLAttributes<HTMLDivElement>;
}

class SettingsSection extends React.Component<SettingsSectionProps> {
  styles: Record<string, string>;

  constructor(props: SettingsSectionProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { children, ariaProps, className } = this.props;
    return (
      <div className={classNames(styles.section, className)} {...ariaProps}>
        {children}
      </div>
    );
  }
}

export default SettingsSection;
