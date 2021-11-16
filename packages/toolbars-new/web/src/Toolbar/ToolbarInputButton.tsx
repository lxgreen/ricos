/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, ReactElement, ReactNode, RefObject, Ref } from 'react';
import classNames from 'classnames';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import Styles from './ToolbarInputButton.scss';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

type ToolbarInputButtonProps = {
  onClick?: (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onChange: (value: string) => void;
  isActive?: boolean;
  theme?: Record<string, string>;
  dataHook?: string;
  tooltipText: string;
  tabIndex?: number;
  forwardRef?: Ref<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  children?: ReactElement | ReactNode;
  disabled?: boolean;
  buttonContent?: string;
  onToolbarButtonClick?: () => void;
};

type ToolbarInputButtonState = {
  inputValue?: string;
};

type InputProps = {
  value?: string;
  inputRef?: RefObject<HTMLInputElement> | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  isActive?: boolean;
};
class Input extends Component<InputProps, ToolbarInputButtonState> {
  constructor(props) {
    super(props);
    this.state = { inputValue: props.value };
  }

  static getDerivedStateFromProps(props) {
    const { value, isActive } = props;
    return !isActive ? { inputValue: value } : {};
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
    this.props.onChange(value);
  };

  render() {
    const { inputRef, disabled } = this.props;
    const { inputValue } = this.state;
    return <input ref={inputRef} disabled={disabled} value={inputValue} onChange={this.onChange} />;
  }
}

class ToolbarInputButton extends Component<ToolbarInputButtonProps> {
  styles: Record<string, string>;

  inputRef: RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    const styles = mergeStyles({ styles: Styles, theme: props.theme });
    this.inputRef = React.createRef<HTMLInputElement>();

    this.styles = {
      button: classNames(styles.toolbarButton),
      buttonWrapper: classNames(styles.toolbarButton_wrapper),
      active: classNames(styles.toolbarButton_active),
      arrowIcon: styles.toolbarDropdownButton_arrowIcon,
      arrowIconActive: styles.arrowIconActive,
    };
  }

  preventDefault = event => event.preventDefault();

  onKeyDown = e => e.keyCode === 13 && this.onClick(e);

  onClick = e => {
    const ref = this.inputRef.current;
    const { onToolbarButtonClick } = this.props;
    onToolbarButtonClick?.();
    if (ref) {
      if (this.props.isActive) {
        ref.blur();
      } else {
        ref.focus();
        ref.select();
      }
    }
    this.props.onClick?.(e);
  };

  render() {
    const {
      isActive,
      tooltipText,
      dataHook,
      tabIndex,
      forwardRef,
      disabled,
      buttonContent,
      onChange,
    } = this.props;
    const { styles } = this;
    const arrowIcon = (
      <span className={styles.arrowIcon}>
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
            onKeyDown={this.onKeyDown}
          >
            <Input
              inputRef={this.inputRef}
              disabled={disabled}
              value={buttonContent}
              onChange={onChange}
              isActive={isActive}
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
