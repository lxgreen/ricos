import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import collapsibleListContentState from '../../../../../e2e/tests/fixtures/collapsible-list-rich-text.json';
import CollapsibleListEditor from './CollapsibleListEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './CollapsibleListEditor.tsx?raw';
import CollapsibleListViewer from './CollapsibleListViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './CollapsibleListViewer.tsx?raw';

export default () => {
  return (
    <Page title="Collapsible List Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={collapsibleListContentState}>
          <CollapsibleListEditor content={collapsibleListContentState} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <CollapsibleListViewer content={collapsibleListContentState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
