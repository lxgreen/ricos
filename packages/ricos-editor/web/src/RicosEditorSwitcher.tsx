import React, { forwardRef } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { RicosEditorRef } from './RicosEditorRef';
import RicosEditorWithRef from './RicosEditor';
import type { RicosEditor } from './RicosEditor';
import type FullRicosEditorTiptap from './RicosEditorTiptap/FullRicosEditorTiptap';

const FullRicosEditorTiptapLazy = React.lazy(
  /* webpackChunkName: "FullRicosEditorTiptap" */
  () => import('./RicosEditorTiptap/FullRicosEditorTiptap')
);

const RicosEditorSwitcher = React.forwardRef<RicosEditorRef, RicosEditorProps>((props, ref) => {
  const useTiptap = !!props.experiments?.tiptapEditor?.enabled;
  if (useTiptap) {
    return (
      <FullRicosEditorTiptapLazy
        {...props}
        ref={ref as React.ForwardedRef<FullRicosEditorTiptap>}
      />
    );
  } else {
    return <RicosEditorWithRef {...props} ref={ref as React.ForwardedRef<RicosEditor>} />;
  }
});

export default forwardRef<RicosEditorRef, RicosEditorProps>((props, ref) => {
  const newProps = {
    ...props,
    ref,
  };
  return <RicosEditorSwitcher {...newProps} />;
});
