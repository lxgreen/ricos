import React from 'react';
import classNames from 'classnames';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import { BUTTON_SIZE } from '..';
import Styles from '../../statics/styles/button.scss';

export interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  isMobile?: boolean;
  dataHook: string;
  size?: string;
  ariaLabel?: string;
  tabIndex?: number;
  disabled?: boolean;
  secondary?: boolean;
  borderless?: boolean;
  theme: RichContentTheme;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  dataHook,
  ariaLabel,
  size = BUTTON_SIZE.small,
  text,
  tabIndex = 0,
  disabled = false,
  secondary = false,
  borderless = false,
  theme,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const buttonStyle = secondary ? styles.button_secondary : styles.button_primary;
  return (
    <button
      aria-label={ariaLabel}
      data-hook={dataHook}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
      className={classNames(buttonStyle, styles[size], className, {
        [styles.borderLess]: borderless,
      })}
    >
      {text}
    </button>
  );
};

export default Button;
