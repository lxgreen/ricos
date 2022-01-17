import React from 'react';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

import EditorWrapper from '../Components/EditorWrapper';
import ViewerWrapper from '../Components/ViewerWrapper';
import introState from '../../../../e2e/tests/fixtures/intro.json';

const NarrowEditorStory = () => {
  const experiments = { toolbarsV2: { enabled: true } };

  return (
    <Page title="Wix Rich Content">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <EditorWrapper content={introState} experiments={experiments} />
        </RichContentEditorBox>
        <RichContentViewerBox>
          <ViewerWrapper content={introState} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};

export default NarrowEditorStory;
