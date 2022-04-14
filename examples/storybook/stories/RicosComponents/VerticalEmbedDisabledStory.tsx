import React from 'react';
import fixtrue from '../../../../e2e/tests/fixtures/empty.json';
import viewerFixtrue from '../../../../e2e/tests/fixtures/vertical-embed.json';
import VerticalEmbedViewer from '../Plugins/VerticalEmbed/VerticalEmbedViewer';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from '../Plugins/VerticalEmbed/VerticalEmbedViewer.tsx?raw';
// eslint-disable-next-line import/no-unresolved
import { ContentState, Section, Page, RichContentViewerBox } from '../Components/StoryParts';

export default () => {
  return (
    <Page title="Vertical Embed">
      <Section title="Disabled button">
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <VerticalEmbedViewer content={viewerFixtrue} disabled />
        </RichContentViewerBox>
      </Section>
      <Section title="Enabled button">
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <VerticalEmbedViewer content={viewerFixtrue} />
        </RichContentViewerBox>
      </Section>
      <Section title="Content State">
        <ContentState json={fixtrue} />
      </Section>
    </Page>
  );
};
