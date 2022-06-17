import React, { useState } from 'react';
import { Loader as LoaderComponent } from 'wix-rich-content-ui-components';
import { Page } from '../Components/StoryParts';

export const Loader = () => {
  const [percent, setPercent] = useState(1);
  return (
    <Page title="Loader">
      <h2>Loader with progress</h2>
      <button onClick={() => percent < 100 && setPercent(percent + 1)}>
        increase loader percent
      </button>
      <div style={{ width: 350, height: 200, position: 'relative' }}>
        <LoaderComponent percent={percent} type={'medium'} />
      </div>
      <h2>Loader with fake progress</h2>
      <div style={{ width: 350, height: 200, position: 'relative' }}>
        <LoaderComponent type={'medium'} />
      </div>
      <h2>Loader without progress</h2>
      <div style={{ width: 350, height: 200, position: 'relative' }}>
        <LoaderComponent disableProgress />
      </div>
    </Page>
  );
};
