import React from 'react';
import fixtrue from '../../../../../e2e/tests/fixtures/linkPreview.json';
import LinkPreviewEditor from './LinkPreviewEditor';
import LinkPreviewViewer from './LinkPreviewViewer';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './LinkPreviewEditor.tsx?raw';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './LinkPreviewViewer.tsx?raw';
import TabsWrapper from '../../Components/TabsWrapper';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';
import apiData from '../apiData';

export default () => {
  return (
    <TabsWrapper apiData={apiData.LINK_PREVIEW}>
      <Page title="Link Preview">
        <Section type={Section.Types.COMPARISON}>
          <RichContentEditorBox
            sourcecode={editorSourcecode}
            content={fixtrue}
            preset="blog-preset"
          >
            <LinkPreviewEditor content={fixtrue} />
          </RichContentEditorBox>
          <RichContentViewerBox preset="blog-preset" sourcecode={viewerSourcecode}>
            <LinkPreviewViewer content={fixtrue} />
          </RichContentViewerBox>
        </Section>
        <Section title="Content State">
          <ContentState json={fixtrue} />
        </Section>
      </Page>
    </TabsWrapper>
  );
};
