/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import classNames from 'classnames';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';

const DEFAULT_FONTSIZE_DROPDOWN_OPTIONS = [
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '24',
  '30',
  '36',
  '48',
  '64',
  '72',
  '96',
];

class FontSizePanel extends Component {
  constructor(props) {
    super(props);
    this.state = { fontSize: props.currentSelect };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static getDerivedStateFromProps(props, state) {
    const { fontSize } = props;
    return state.fontSize !== fontSize ? { fontSize } : null;
  }

  static contextType = GlobalContext;

  onSaveFontSize = type => {
    this.props?.onToolbarButtonClick?.(type);
    return this.props.onSave(type);
  };

  defaultFontSizes = () => {
    const insertSorted = (array, value) => {
      if (!array.includes(value) && value !== '') {
        array.push(value);
        array.sort((a, b) => parseInt(a) - parseInt(b));
      }
      return array;
    };
    const defaults = insertSorted(
      [...DEFAULT_FONTSIZE_DROPDOWN_OPTIONS],
      this.props.currentSelect
    ).map(fontSize => ({
      text: fontSize,
      commandKey: fontSize,
    }));
    return defaults;
  };

  onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };

  render() {
    const { isMobile, t, currentSelect, onCancel } = this.props;
    const panelHeader = t('FontSize_Panel');

    const panel = isMobile ? (
      <MobilePanel
        {...{
          currentSelect,
          panelHeader,
          options: this.defaultFontSizes(),
          onChange: this.onSaveFontSize,
          onCancel,
        }}
      />
    ) : (
      <DesktopPanel
        {...{
          currentSelect,
          options: this.defaultFontSizes(),
          onChange: this.onSaveFontSize,
        }}
        sizeFitContent
      />
    );
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.onBlur}
        className={classNames(styles.panel_Container, {
          [styles.mobile_Container]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

export default FontSizePanel;
