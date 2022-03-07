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
import { RicosToolbarWrapper, Content, ToolbarContext } from 'wix-rich-content-toolbars-v2';
import type { AvailableExperiments } from 'ricos-types';

const DraftWithDetachCommands = () => {
  const experiments: AvailableExperiments = {
    toolbarsV2: { enabled: true },
    detachCommandsFromEditor: { enabled: true },
  };
  const currentContent = useRef(Content.create(null));
  const editorCommands = useRef(null);
  const [counter, setCounter] = useState(1);
  const [context, setContext] = useState(undefined);

  return (
    <Page title="Wix Rich Content">
      <Section>
        <div>
          <RichContentEditorBox>
            <ToolbarContext.Provider value={context}>
              <div dir="" data-hook="yaron123" style={{ border: 'solid 10px red', padding: 10 }}>
                {editorCommands.current && (
                  <RicosToolbarWrapper
                    content={currentContent.current}
                    editorCommands={editorCommands.current}
                    experiments={experiments}
                  />
                )}
              </div>
            </ToolbarContext.Provider>
            <EditorWrapper
              rcProps={{
                onLoad: context =>
                  setTimeout(() => {
                    setContext(context);
                  }),
              }}
              content={introState}
              experiments={experiments}
              onChange={(content, editor) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                window.editor = editor;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                window.editorCommands = editor?.getEditorCommands();
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

export default DraftWithDetachCommands;
