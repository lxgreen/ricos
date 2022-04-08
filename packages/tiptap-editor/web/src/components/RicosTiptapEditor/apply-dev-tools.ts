import type { Editor } from '@tiptap/react';

export const applyDevTools = (editor: Editor) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (/debug/i.test(window.location.search)) {
    import(
      /* webpackChunkName: "prosemirror-dev-tools" */
      'prosemirror-dev-tools'
    ).then(({ applyDevTools }) => {
      applyDevTools(editor.view);
    });
  }
};
