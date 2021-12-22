import React from 'react';
import { PollEditor } from '../components';
import { POLL_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';
import { NodeSelection } from 'prosemirror-state';

export const Poll: React.FC<PluginProps> = ({
  context,
  componentData,
  node,
  updateAttributes,
  selected,
  editor,
  getPos,
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

  const setSelection = () => {
    if (!selected) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selection = NodeSelection.create(editor.view.state.doc, (getPos as any)());
      const transaction = editor.view.state.tr.setSelection(selection);
      editor.view.dispatch(transaction);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={setSelection}>
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
    </div>
  );
};
