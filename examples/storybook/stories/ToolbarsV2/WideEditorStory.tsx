import React, { useRef, useState } from 'react';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import { RicosToolbarWrapper, Content } from 'wix-rich-content-toolbars-v2';

const WideEditorStory = () => {
  const experiments = { toolbarsV2: { enabled: true }, tiptapEditor: { enabled: false } };
  const currentContent = useRef(Content.create(null));
  const editorCommands = useRef(null);
  const [counter, setCounter] = useState(1);
  return (
    <Page title="Wix Rich Content">
      <Section>
        <div>
          <RichContentEditorBox>
            <div dir="" data-hook="yaron123" style={{ border: 'solid 10px red', padding: 10 }}>
              {editorCommands.current && (
                <RicosToolbarWrapper
                  content={currentContent.current}
                  editorCommands={editorCommands.current}
                />
              )}
            </div>
            <EditorWrapper
              content={introState}
              experiments={experiments}
              onChange={(content, editor) => {
                window.editor = editor;
                window.editorCommands = editor?.getEditorCommands();
                const editorState = editor?.getEditorCommands().getEditorState();
                editorCommands.current = new Proxy(
                  {},
                  {
                    get: (target, prop, receiver) => {
                      return {
                        ...editor?.getEditorCommands(),
                        focus: editor.focus,
                      };
                    },
                  }
                );
                if (editorState) {
                  if (counter < 2) {
                    setCounter(counter + 1);
                  }
                  currentContent.current.update(editorState);
                }
              }}
            />
          </RichContentEditorBox>
        </div>
      </Section>
      <Section title="Wix Rich Content Viewer">
        <RichContentViewerBox>
          <ViewerWrapper content={introState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};

export default WideEditorStory;
