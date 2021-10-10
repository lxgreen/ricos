import React, { FunctionComponent, Ref, useContext } from 'react';
import styles from '../statics/styles/Iframe.scss';
import { GlobalContext } from 'wix-rich-content-common';

const Iframe: FunctionComponent<{ iframeRef?: Ref<HTMLIFrameElement>; [key: string]: unknown }> = ({
  iframeRef,
  ...otherProps
}) => {
  const context = useContext(GlobalContext);
  const loading = context.experiments.lazyImagesAndIframes?.enabled ? 'lazy' : undefined;
  return (
    <iframe
      ref={iframeRef}
      className={styles.iframe}
      title="remote content"
      style={{ backgroundColor: 'transparent' }}
      loading={loading}
      {...otherProps}
    />
  );
};

export default Iframe;
