import React from 'react';
import { RicosEditor } from './RicosEditor';

const FullRicosEditorTiptapLazy = React.lazy(
  /* webpackChunkName: "FullRicosEditorTiptap" */
  () => import('./RicosEditorTiptap/FullRicosEditorTiptap')
);

const RicosEditorSwitcher = props => {
  const useTiptap = !!props.experiments?.tiptapEditor?.enabled;
  if (useTiptap) {
    return <FullRicosEditorTiptapLazy {...props} />;
  } else {
    return <RicosEditor {...props} />;
  }
};

export { RicosEditorSwitcher };
