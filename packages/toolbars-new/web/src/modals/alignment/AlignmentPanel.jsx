/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import classNames from 'classnames';
import { alignmentsModalData as alignments } from '../../Toolbar/buttonsListCreatorConsts';

const AlignmentPanel = ({ isMobile, t, theme, currentSelect, onSave, onTooltipOpen, ...props }) => {
  const panelHeader = t('Alignment');
  const hasIcons = true;
  const onChange = (alignment, clickFromKeyboard) => {
    props?.onToolbarButtonClick?.(alignment);
    onSave({ data: alignment, clickFromKeyboard });
  };

  const panel = isMobile ? (
    <MobilePanel
      {...{
        currentSelect,
        panelHeader,
        options: alignments,
        onChange,
        hasIcons,
        t,
      }}
    />
  ) : (
    <DesktopPanel
      {...{
        currentSelect,
        options: alignments,
        onChange,
        theme,
        sizeFitContent: true,
        t,
        onTooltipOpen,
      }}
    />
  );
  return (
    <div
      className={classNames(styles.panel_Container, {
        [styles.mobile_Container]: isMobile,
      })}
    >
      {panel}
    </div>
  );
};

export default AlignmentPanel;
