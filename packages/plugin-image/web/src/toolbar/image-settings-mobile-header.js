import React from 'react';
import PropTypes from 'prop-types';
import { SettingsMobileHeader } from 'wix-rich-content-ui-components';

const ImageSettingsMobileHeader = ({
  theme,
  saveName,
  cancelName,
  t,
  onSave,
  onCancel,
  switchTab,
  otherTab,
}) => {
  const props = {
    theme,
    onSave,
    onCancel,
    switchTab,
    otherTab,
    isMediaSettingsModal: true,
    dataHookPrefix: 'ImageSettingsMobileHeader',
    cancelLabel: cancelName || t('ImageSettings_MobileHeader_Cancel'),
    saveLabel: saveName || t('ImageSettings_MobileHeader_Save'),
  };

  return <SettingsMobileHeader {...props} />;
};

ImageSettingsMobileHeader.propTypes = {
  onSave: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  otherTab: PropTypes.string,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default ImageSettingsMobileHeader;
