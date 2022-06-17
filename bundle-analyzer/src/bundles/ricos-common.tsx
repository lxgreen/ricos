import type { FunctionComponent } from 'react';
import React from 'react';
import { RicosEngine } from 'ricos-common';

const functionComponent: FunctionComponent = () => <div />;

export default () => {
  return (
    <RicosEngine RicosModal={functionComponent} getContentId={() => ''} isViewer>
      <div />
    </RicosEngine>
  );
};
