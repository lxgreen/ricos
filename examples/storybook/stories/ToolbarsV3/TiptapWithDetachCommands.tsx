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
import { RicosTiptapToolbar, Content, ToolbarContext } from 'wix-rich-content-toolbars-v3';
import type { AvailableExperiments } from 'ricos-types';

const TiptapWithDetachCommands = () => {
  const experiments: AvailableExperiments = {
    toolbarsV3: { enabled: true },
    tiptapEditor: { enabled: true },
    detachCommandsFromEditor: { enabled: true },
  };
  const currentContent = useRef(Content.create([]));
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
                  <RicosTiptapToolbar
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                if (window.editor) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  editorCommands.current = { commands: window.editor.getCommands() };
                  // console.log('editorCommands.current', editorCommands.current);
                  if (editorCommands.current) {
                    if (counter < 2) {
                      setCounter(counter + 1);
                    }
                  }
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  window.editor.editor.editor.on('selectionUpdate', ({ editor }) => {
                    const selection = editor.state.selection;
                    const nodes: Node[] = [];
                    editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
                      nodes.push(node);
                    });
                    const selectedNodes = nodes;
                    currentContent.current.update(selectedNodes);
                  });
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

export default TiptapWithDetachCommands;
