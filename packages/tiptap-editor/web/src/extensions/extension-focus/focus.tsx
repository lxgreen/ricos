import { pipe } from 'fp-ts/function';
import { createRicosGenericExtensionConfig } from './../../extensions-creators/extension';
import React, { useState, useEffect, ComponentType } from 'react';
import { Editor } from '@tiptap/react';

const name = 'focus';

const isInSelection = (selection: Editor['state']['selection']) => (position: number) =>
  position >= selection.$from.pos && position <= selection.$to.pos;

const useIsSelected = (editor: Editor, getPos: () => number) => {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    const onSelectionUpdate = ({ editor }) =>
      pipe(getPos(), isInSelection(editor.state.selection), setSelected);
    editor.on('selectionUpdate', onSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', onSelectionUpdate);
    };
  }, []);

  return isSelected;
};

export const createFocusConfig = () =>
  createRicosGenericExtensionConfig({
    type: 'extension',
    createConfig: () => ({
      name,
      priority: 20,
      addNodeViewHOC: () => ({
        nodeTypes: ['*'],
        nodeViewHOC: (Component: ComponentType) => props => (
          <Component {...props} isFocused={useIsSelected(props.editor, props.getPos)} />
        ),
      }),
    }),
  });
