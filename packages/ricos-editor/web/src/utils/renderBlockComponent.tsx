import type { FC } from 'react';
import React from 'react';

const offset = { x: 40 };

export const renderSideBlockComponent = (
  id: string,
  dir: string,
  Component: FC<{ id: string }>
) => {
  const node = document.querySelectorAll(`[data-offset-key="${id}-0-0"]`)[0] as HTMLElement;
  if (node?.offsetParent) {
    const { top, x } = node.getBoundingClientRect();
    const parentTop = node.offsetParent.getBoundingClientRect().top;
    return (
      <div
        dir={dir}
        style={{
          position: 'absolute',
          top: top - parentTop,
          insetInlineEnd: x - offset.x,
        }}
      >
        <Component id={id} />
      </div>
    );
  }
};
