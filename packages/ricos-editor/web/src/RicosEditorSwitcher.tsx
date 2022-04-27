import React, { forwardRef } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { RicosEditor } from './RicosEditor';
import RicosEditorWithRef from './RicosEditor';

const FullRicosEditorTiptapLazy = React.lazy(
  /* webpackChunkName: "FullRicosEditorTiptap" */
  () => import('./RicosEditorTiptap/FullRicosEditorTiptap')
);

const RicosEditorSwitcher = React.forwardRef<RicosEditor, RicosEditorProps>((props, ref) => {
  const useTiptap = !!props.experiments?.tiptapEditor?.enabled;
  if (useTiptap) {
    return <FullRicosEditorTiptapLazy {...props} />;
  } else {
    return <RicosEditorWithRef {...props} ref={ref} />;
  }
});

export default forwardRef<RicosEditor, RicosEditorProps>((props, ref) => {
  const newProps = {
    ...props,
    ref,
  };
  return <RicosEditorSwitcher {...newProps} />;
});
