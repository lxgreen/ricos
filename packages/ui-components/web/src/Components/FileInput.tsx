import React, { ChangeEvent, Component, CSSProperties } from 'react';
import classnames from 'classnames';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import styles from '../../statics/styles/file-input.scss';

interface FileInputProps {
  accept?: string;
  className?: string;
  onChange: (files: File[]) => void;
  handleFileSelection?: (multiple: boolean) => void;
  multiple: boolean;
  disabled?: boolean;
  title?: string;
  style?: CSSProperties;
  theme?: RichContentTheme;
  dataHook?: string;
  tabIndex?: number;
}

class FileInput extends Component<FileInputProps, { focused: boolean }> {
  styles: Record<string, string>;

  id: string;

  value = null;

  static defaultProps = {
    accept: '.jpg,.png,.gif,.jpeg,.jpe,.jfif,.bmp,.heic,.heif,.tfif,.tif,.webp',
    multiple: false,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focused: false };
    this.id = `file_input_${Math.floor(Math.random() * 9999)}`;
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onClick = () => {
    const { handleFileSelection, multiple } = this.props;
    handleFileSelection?.(multiple);
  };

  handleChange = (e: ChangeEvent<{ files: FileList | null; value }>) => {
    this.props.onChange(Array.from(e.target.files || []));
    e.target.value = null;
  };

  render() {
    const {
      accept,
      multiple,
      className,
      title,
      children,
      dataHook,
      tabIndex,
      disabled,
      handleFileSelection,
    } = this.props;
    const hasMultiple = multiple ? { multiple } : {};
    const { styles } = this;
    const a11yProps = {
      role: 'button',
      'aria-label': title,
    };

    return (
      <label
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: disabled doesn't exist in label
        disabled={disabled}
        htmlFor={this.id}
        className={classnames({
          ...(className ? { [className]: true } : undefined),
          [styles.focused]: this.state.focused,
        })}
        style={this.props.style}
        title={title}
      >
        {handleFileSelection ? (
          <button
            disabled={disabled}
            className={styles.visuallyHidden}
            {...a11yProps}
            id={this.id}
            data-hook={dataHook}
            onClick={this.onClick}
          />
        ) : (
          <input
            {...a11yProps}
            className={styles.visuallyHidden}
            disabled={disabled}
            id={this.id}
            type={'file'}
            data-hook={dataHook}
            onChange={this.handleChange}
            onClick={() => this.value === null}
            accept={accept}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            tabIndex={tabIndex}
            {...hasMultiple}
          />
        )}
        {children}
      </label>
    );
  }
}

export default FileInput;
