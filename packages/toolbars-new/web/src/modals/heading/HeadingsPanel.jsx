/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import classNames from 'classnames';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';

export const DEFAULT_HEADERS_DROPDOWN_OPTIONS = Object.freeze([
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
]);

class HeadingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { heading: props.currentSelect };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentDidUpdate() {
    const { heading } = this.state;
    if (heading !== this.props.currentSelect) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ heading: this.props.currentSelect });
    }
  }

  static contextType = GlobalContext;

  onSaveHeading = (type, clickFromKeyboard) => {
    this.props?.onToolbarButtonClick?.(type);
    return this.props.onSave({ clickFromKeyboard, data: type });
  };

  defaultHeadings = () => {
    const defaults = DEFAULT_HEADERS_DROPDOWN_OPTIONS.map(heading => ({
      text: this.props.translateHeading(heading, this.props.t),
      commandKey: HEADER_TYPE_MAP[heading],
    }));
    return defaults;
  };

  render() {
    const { isMobile, t, currentSelect, onCancel } = this.props;
    const panelHeader = t('Headings');

    const panel = isMobile ? (
      <MobilePanel
        {...{
          currentSelect,
          panelHeader,
          options: this.defaultHeadings(),
          onChange: this.onSaveHeading,
          onCancel,
          t,
        }}
      />
    ) : (
      <DesktopPanel
        {...{ currentSelect, options: this.defaultHeadings(), onChange: this.onSaveHeading, t }}
      />
    );
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={classNames(styles.panel_Container, {
          [styles.mobile_Container]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

export default HeadingsPanel;
