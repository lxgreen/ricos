import React from 'react';
import { PollEditor } from '../components';
import { POLL_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';

export const Poll: React.FC<PluginProps> = ({
  context,
  componentData,
  node,
  updateAttributes,
  selected,
  editor,
}) => {
  const { theme, t, config = {}, isMobile } = context;
  const settings = config[POLL_TYPE] || {};
  const block = { getKey: () => node.attrs.id };
  const helpers = { handleFileUpload: settings.uploadHandler };
  //mocks
  const store = {
    update: (type, data) => updateAttributes(convertBlockDataToRicos(POLL_TYPE, data)),
    set: (type, data, id) => updateAttributes(convertBlockDataToRicos(POLL_TYPE, data)),
    get: type => componentData,
  };
  const setInPluginEditingMode = () => {};

  return (
    <PollEditor
      componentData={componentData}
      settings={settings}
      theme={theme}
      t={t}
      isMobile={isMobile}
      block={block}
      selected={selected}
      helpers={helpers}
      store={store}
      setInPluginEditingMode={setInPluginEditingMode}
    />
  );
};
