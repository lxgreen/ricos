import type { FC } from 'react';
import React from 'react';

export const renderSideBlockComponent = (
  id: string,
  dir: string,
  Component: FC<{ id: string }>
) => {
  const node = document.querySelectorAll(`[data-offset-key="${id}-0-0"]`)[0] as HTMLElement;
  if (node?.offsetParent) {
    const top = node.getBoundingClientRect().top;
    const parentTop = node.offsetParent.getBoundingClientRect().top;
    const lineHeight = window.getComputedStyle(node).getPropertyValue('line-height');
    return (
      <div
        dir={dir}
        style={{
          position: 'absolute',
          display: 'block',
          top: top - parentTop,
          lineHeight,
          insetInlineEnd: 0,
        }}
      >
        <Component id={id} />
      </div>
    );
  }
};
