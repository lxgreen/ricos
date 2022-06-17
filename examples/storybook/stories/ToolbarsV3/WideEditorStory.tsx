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
import {
  RicosDraftToolbar,
  RicosTiptapToolbar,
  Content,
  ToolbarContext,
} from 'wix-rich-content-toolbars-v3';

const WideEditorStory = () => {
  const experiments = { toolbarsV3: { enabled: true }, tiptapEditor: { enabled: false } };
  const currentContent = !experiments.tiptapEditor.enabled
    ? useRef(Content.create(null))
    : useRef(Content.create([]));
  const editorCommands = useRef(null);
  const [counter, setCounter] = useState(1);
  const [context, setContext] = useState(undefined);

  const baseStyles = { flex: 'none', webkitTapHighlightColor: 'transparent' };
  const baseMobileStyles = { ...baseStyles, position: 'sticky', top: 0, zIndex: 9 };

  return (
    <Page title="Wix Rich Content">
      <Section>
        <div>
          <RichContentEditorBox>
            <ToolbarContext.Provider value={context}>
              <div
                style={context?.isMobile ? baseMobileStyles : baseStyles}
                dir=""
                data-hook="yaron123"
              >
                {editorCommands.current && !experiments.tiptapEditor.enabled && (
                  <>
                    <RicosDraftToolbar
                      content={currentContent.current}
                      editorCommands={editorCommands.current}
                    />
                  </>
                )}
                {editorCommands.current && experiments.tiptapEditor.enabled && (
                  <RicosTiptapToolbar
                    content={currentContent.current}
                    editorCommands={editorCommands.current}
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
                if (!experiments.tiptapEditor.enabled) {
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                } else if (experiments.tiptapEditor.enabled && window.editor) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  editorCommands.current = window.editor.editor.editor.commandManager;
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
                    // console.log(selectedNodes);
                  });
                }

                // currentContent.current.update(editorState);
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
