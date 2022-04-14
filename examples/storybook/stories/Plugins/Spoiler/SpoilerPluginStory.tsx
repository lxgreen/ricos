import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import spoilerContentState from '../../../../../e2e/tests/fixtures/spoiler.json';
import SpoilerEditor from './SpoilerEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './SpoilerEditor.tsx?raw';
import SpoilerViewer from './SpoilerViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './SpoilerViewer.tsx?raw';

export default () => {
  return (
    <Page title="Spoiler Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={spoilerContentState}>
          <SpoilerEditor content={spoilerContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <SpoilerViewer content={spoilerContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
