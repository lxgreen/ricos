/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, ReactElement, ReactNode, Ref, RefObject } from 'react';
import classNames from 'classnames';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import Styles from './ToolbarInputButton.scss';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

type ToolbarInputButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSave?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
  theme?: Record<string, string>;
  dataHook?: string;
  isMobile?: boolean;
  tooltipText: string;
  tabIndex?: number;
  forwardRef?: Ref<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  children?: ReactElement | ReactNode;
  disabled?: boolean;
  buttonContent?: string;
  disabledStyle?: boolean;
  onToolbarButtonClick?: () => void;
  asLink?: boolean;
};

type ToolbarInputButtonState = {
  inputValue?: string;
};

class ToolbarInputButton extends Component<ToolbarInputButtonProps, ToolbarInputButtonState> {
  styles: Record<string, string>;

  inputRef: RefObject<any>;

  constructor(props) {
    super(props);
    // const { buttonStyles = {} } = props.theme || {};
    const styles = mergeStyles({ styles: Styles, theme: props.theme });
    this.state = { inputValue: undefined };
    this.inputRef = React.createRef();

    this.styles = {
      button: classNames(
        styles.toolbarButton,
        props.isMobile && styles.toolbarButton_mobile
        // buttonStyles.inlineToolbarButton,
        // buttonStyles.pluginToolbarButton
      ),
      buttonWrapper: classNames(
        styles.toolbarButton_wrapper,
        props.isMobile && styles.toolbarButton_wrapper_mobile,
        props.asLink && styles.toolbarButton_wrapper_asLink
        // buttonStyles.inlineToolbarButton_wrapper,
        // buttonStyles.pluginToolbarButton_wrapper
      ),
      active: classNames(
        styles.toolbarButton_active
        // buttonStyles.inlineToolbarButton_active,
        // buttonStyles.pluginToolbarButton_active
      ),
      arrowIcon: styles.toolbarDropdownButton_arrowIcon,
      arrowIconActive: styles.arrowIconActive,
    };
  }

  preventDefault = event => event.preventDefault();

  onClick = (...args: [any]) => {
    const { onToolbarButtonClick } = this.props;
    onToolbarButtonClick?.();
    this.inputRef.current.focus();
    this.props.onClick?.(...args);
  };

  onChange = e => {
    if (e.code === 'Enter') {
      this.setState({ inputValue: undefined });
      this.props.onSave?.(e.target.value);
      this.inputRef.current.blur();
    } else {
      this.setState({ inputValue: e.target.value });
      this.props.onChange?.(e.target.value);
    }
  };

  getInputValue = () => {
    const { buttonContent } = this.props;
    const { inputValue } = this.state;
    return typeof inputValue === 'undefined' ? buttonContent : inputValue;
  };

  render() {
    const { isActive, tooltipText, dataHook, tabIndex, forwardRef, disabled } = this.props;
    const { styles } = this;
    const arrowIcon = (
      <span
        className={classNames(styles.arrowIcon, {
          [styles.arrowIconActive]: isActive,
        })}
      >
        <DropdownArrowIcon />
      </span>
    );

    const menuButtonClassNames = classNames(styles.button, {
      [styles.active]: isActive,
    });

    const wrapperClassNames = classNames(styles.buttonWrapper, {
      [styles.active]: isActive,
    });

    return (
      <Tooltip key={tooltipText} content={tooltipText} tooltipOffset={{ x: 0, y: -8 }}>
        <div className={wrapperClassNames}>
          <div
            className={menuButtonClassNames}
            onClick={this.onClick}
            role="button"
            ref={forwardRef}
            tabIndex={tabIndex}
            data-hook={dataHook}
            aria-label={tooltipText}
            onMouseDown={this.preventDefault}
            onKeyDown={this.onClick}
          >
            <input
              ref={this.inputRef}
              disabled={disabled}
              value={this.getInputValue()}
              onChange={this.onChange}
            />
            {arrowIcon}
            {this.props.children}
          </div>
        </div>
      </Tooltip>
    );
  }
}

export default React.forwardRef<ToolbarInputButton, ToolbarInputButtonProps>((props, ref) => (
  <ToolbarInputButton forwardRef={ref} {...props} />
));

export type ToolbarInputButtonType = ToolbarInputButton;
