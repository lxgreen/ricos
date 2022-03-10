import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

const DividerEditor: FunctionComponent<{
  content?: DraftContent;
  injectedContent?: DraftContent;
  maxTextLength?: number;
}> = ({ content, injectedContent, maxTextLength }) => {
  const editorRef = useRef(null);
  const logTraits = () => {
    const traits = editorRef.current?.getContentTraits();
    console.debug(traits); // eslint-disable-line
  };
  return (
    <RicosEditor
      plugins={[pluginDivider()]}
      maxTextLength={maxTextLength}
      injectedContent={injectedContent}
      onChange={logTraits}
      content={content}
      ref={editorRef}
    />
  );
};

export default DividerEditor;
