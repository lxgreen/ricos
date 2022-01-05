import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import mapContentState from '../../../../../e2e/tests/fixtures/map.json';
import MapEditor from './MapEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from '!!raw-loader!./MapEditor.tsx';
import MapViewer from './MapViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from '!!raw-loader!./MapViewer.tsx';

export default () => {
  return (
    <Page title="Map Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={mapContentState}>
          <MapEditor content={mapContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <MapViewer content={mapContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
