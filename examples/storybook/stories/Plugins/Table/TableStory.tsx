import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/tablesExamples.json';
import TableViewer from './TableViewer';
import TableEditor from './TableEditor';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './TableViewer.tsx?raw';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './TableEditor.tsx?raw';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';

export default () => {
  return (
    <Page title="Table">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={fixtrue}>
          <TableEditor content={fixtrue} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <TableViewer content={fixtrue} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
