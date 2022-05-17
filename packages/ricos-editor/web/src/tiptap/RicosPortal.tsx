import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  className?: string;
  container?: HTMLElement;
  children?: ReactNode;
}

const RicosPortal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div ref={ref} data-id="ricos-portal" className={props?.className}>
      {props?.children}
    </div>
  );
});

export default forwardRef<HTMLDivElement, Props>((props, ref) => {
  return ReactDOM.createPortal(
    <RicosPortal {...props} ref={ref} />,
    props?.container || document.body
  );
});
