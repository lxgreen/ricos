// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
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
  const experiments = {
    toolbarsV2: { enabled: true },
    tiptapEditor: { enabled: false },
    detachCommandsFromEditor: { enabled: true },
  };
  const currentContent = !experiments.tiptapEditor.enabled
    ? useRef(Content.create(null))
    : useRef(Content.create([]));
  const editorCommands = useRef(null);
  const [counter, setCounter] = useState(1);

  return (
    <Page title="Wix Rich Content">
      <Section>
        <div>
          <RichContentEditorBox>
            <div dir="" data-hook="yaron123" style={{ border: 'solid 10px red', padding: 10 }}>
              {editorCommands.current && !experiments.tiptapEditor.enabled && (
                <>
                  <RicosToolbarWrapper
                    content={currentContent.current}
                    editorCommands={editorCommands.current}
                    experiments={experiments}
                  />
                </>
              )}
            </div>
            <EditorWrapper
              content={introState}
              experiments={experiments}
              onChange={(content, editor) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                window.editor = editor;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                window.editorCommands = editor?.getEditorCommands();
                if (!experiments.tiptapEditor.enabled) {
                  const editorState = editor?.getEditorCommands().getEditorState();
                  editorCommands.current = new Proxy(
                    {},
                    {
                      get: (target, prop, receiver) => {
                        return {
                          ...editor?.getCommands(),
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
