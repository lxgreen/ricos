import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import videoContentState from '../../../../../e2e/tests/fixtures/facebook-video.json';
import VideoEditor from './VideoEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './VideoEditor.tsx?raw';
import VideoViewer from './VideoViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './VideoViewer.tsx?raw';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import TabsWrapper from '../../Components/TabsWrapper';
import apiData from '../apiData';

const mockData = {
  url: 'https://www.youtube.com/watch?v=vzKryaN44ss',
};
const handleFileUpload = {
  mock: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({
        data: mockData,
      });
    }, 1000);
  },
  error: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({ error: { msg: 'file too large' } });
    }, 2000);
  },
};

const VideoPluginStory = () => (
  <TabsWrapper apiData={apiData.VIDEO}>
    <Page title="Video Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={videoContentState}>
          <VideoEditor content={videoContentState} handleFileUpload={handleFileUpload.mock} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <VideoViewer content={videoContentState} />
        </RichContentViewerBox>
      </Section>

      <Section title="onFilesChange Error (with UI)">
        <div>With Error Message:</div>
        <SyntaxHighlighter
          // eslint-disable-next-line max-len
          code={`handleFileUpload = (files, updateEntity) => updateEntity({ data: [], error: { msg: 'file too large' } });`}
        />
        <RichContentEditorBox>
          <VideoEditor handleFileUpload={handleFileUpload.error} />
        </RichContentEditorBox>
      </Section>
    </Page>
  </TabsWrapper>
);

export default VideoPluginStory;
