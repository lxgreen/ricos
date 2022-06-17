import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { isSSR } from 'wix-rich-content-common';
import type { TextDirection } from 'ricos-types';

interface Props {
  className?: string;
  container?: HTMLElement;
  children?: ReactNode;
  languageDir?: TextDirection;
}

const RicosPortal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div dir={props?.languageDir} ref={ref} data-id="ricos-portal" className={props?.className}>
      {props?.children}
    </div>
  );
});

export default forwardRef<HTMLDivElement, Props>((props, ref) => {
  if (!isSSR()) {
    const container = props?.container ?? document?.body;
    return ReactDOM.createPortal(<RicosPortal {...props} ref={ref} />, container);
  }
  return <RicosPortal {...props} ref={ref} />;
});
