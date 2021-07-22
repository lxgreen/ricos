import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { BUTTON_SIZE } from '..';
import styles from '../../statics/styles/button.scss';

class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary']),
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    dataHook: PropTypes.string,
    ariaProps: PropTypes.object,
    size: PropTypes.string,
    text: PropTypes.string,
    tabIndex: PropTypes.number,
    borderless: PropTypes.bool,
  };

  static defaultProps = {
    type: 'primary',
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const {
      onClick,
      className,
      type,
      dataHook,
      ariaProps,
      size = BUTTON_SIZE.small,
      text,
      tabIndex = '0',
      borderless = false,
    } = this.props;
    return (
      <button
        {...ariaProps}
        data-hook={dataHook}
        onClick={onClick}
        tabIndex={tabIndex}
        className={classNames(this.styles[`button_${type}`], this.styles[size], className, {
          [this.styles.borderless]: borderless,
        })}
      >
        {text}
      </button>
    );
  }
}

export default Button;
