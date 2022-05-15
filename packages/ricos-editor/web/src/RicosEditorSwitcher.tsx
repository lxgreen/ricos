import React, { forwardRef, Suspense } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { RicosEditorRef } from './RicosEditorRef';
import RicosEditorWithRef from './RicosEditor';
import type { RicosEditor } from './RicosEditor';
import type { FullRicosEditor } from './tiptap/FullRicosEditor';

const FullRicosEditorLazy = React.lazy(
  /* webpackChunkName: "FullRicosEditor" */
  () => import('./tiptap/FullRicosEditor')
);

const RicosEditorSwitcher = React.forwardRef<RicosEditorRef, RicosEditorProps>((props, ref) => {
  const useTiptap = !!props.experiments?.tiptapEditor?.enabled;
  if (useTiptap) {
    return (
      <Suspense fallback={<div />}>
        <FullRicosEditorLazy {...props} ref={ref as React.ForwardedRef<FullRicosEditor>} />
      </Suspense>
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
