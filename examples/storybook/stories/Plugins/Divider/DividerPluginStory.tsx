import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import dividerContentState from '../../../../../e2e/tests/fixtures/divider.json';
import DividerEditor from './DividerEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './DividerEditor.tsx?raw';
import DividerViewer from './DividerViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './DividerViewer.tsx?raw';

export default () => {
  return (
    <Page title="Divider Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={dividerContentState}>
          <DividerEditor content={dividerContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <DividerViewer content={dividerContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
