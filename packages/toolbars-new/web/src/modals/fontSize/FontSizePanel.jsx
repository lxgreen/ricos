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
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static contextType = GlobalContext;

  onSaveFontSize = (value, clickFromKeyBoard) => {
    this.props?.onToolbarButtonClick?.(value);
    this.props.onSave({ data: value, clickFromKeyBoard });
  };

  getFontSizeOptions = () => {
    const insertSorted = (array, value) => {
      if (!array.includes(value) && value !== '') {
        array.push(value);
        array.sort((a, b) => parseInt(a) - parseInt(b));
      }
      return array;
    };
    const options = insertSorted(
      [...DEFAULT_FONTSIZE_DROPDOWN_OPTIONS],
      this.props.currentSelect
    ).map(fontSize => ({
      text: fontSize,
      commandKey: fontSize,
    }));
    return options;
  };

  onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };

  render() {
    const { t, currentSelect, onCancel } = this.props;
    const panelHeader = t?.('FontSize_Panel');
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onBlur={this.onBlur} className={classNames(styles.panel_Container)}>
        <DesktopPanel
          {...{
            currentSelect,
            options: this.getFontSizeOptions(),
            onChange: this.onSaveFontSize,
            t,
          }}
          sizeFitContent
          externalFocus
        />
      </div>
    );
  }
}

export default FontSizePanel;
