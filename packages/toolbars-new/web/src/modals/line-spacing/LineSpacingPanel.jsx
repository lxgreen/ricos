/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import CustomPanel from './CustomPanel';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { lineSpacingModalData as lineHeights } from '../../Toolbar/buttonsListCreatorConsts';
class LineSpacingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { spacing: props.currentSelect };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  showCustomPanel = () => {
    this.setState({ isCustomPanel: true });
  };

  onChange = spacing => {
    const merged = { ...this.state.spacing, ...spacing };
    this.setState({ spacing: merged });
    this.props?.onToolbarButtonClick?.(merged['line-height']);
    this.props.onChange(merged);
  };

  onSave = (spacing, clickFromKeyboard) => {
    const merged = { ...this.state.spacing, ...spacing };
    this.props?.onToolbarButtonClick?.(merged['line-height']);
    this.props.onSave({ data: merged, clickFromKeyboard });
  };

  onCancel = e => this.props.onCancel({ clickFromKeyboard: !e.detail });

  render() {
    const { t, isMobile, currentSelect, theme } = this.props;
    const { isCustomPanel, spacing } = this.state;
    const { styles, showCustomPanel, onChange, onSave, onCancel } = this;
    const onSaveLineHeight = (height, clickFromKeyboard) =>
      onSave({ 'line-height': height }, clickFromKeyboard);
    const onChangeLineHeight = height => onChange({ 'line-height': `${height}` });
    const panelHeader = t('LineSpacing_lineSpacing');

    const panel = isMobile ? (
      <MobilePanel
        {...{
          currentSelect,
          panelHeader,
          options: lineHeights,
          onChange: onChangeLineHeight,
          onCancel,
          t,
        }}
      />
    ) : isCustomPanel ? (
      <CustomPanel
        {...{ spacing, onChange, onSave: e => onSave({}, !e.detail), onCancel, t, isMobile, theme }}
      />
    ) : (
      <DesktopPanel
        {...{
          currentSelect,
          options: lineHeights,
          onChange: onSaveLineHeight,
          panelHeader,
          customPanelOptions: { inline: false, onOpen: showCustomPanel },
          t,
        }}
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

export default LineSpacingPanel;
