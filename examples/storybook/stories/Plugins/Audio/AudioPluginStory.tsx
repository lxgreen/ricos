import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import audioContentState from '../../../../../e2e/tests/fixtures/audio.json';
import AudioEditor from './AudioEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './AudioEditor.tsx?raw';
import AudioViewer from './AudioViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './AudioViewer.tsx?raw';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import TabsWrapper from '../../Components/TabsWrapper';
import apiData from '../apiData';

const mockData = {
  audio: {
    src: {
      id: 'mp3/f0f74f_35a1cdce4973490eac49e74c3244364d.mp3',
    },
  },
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

const AudioPluginStory = () => (
  <TabsWrapper apiData={apiData.AUDIO}>
    <Page title="Audio Plugin">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={audioContentState}>
          <AudioEditor content={audioContentState} handleFileUpload={handleFileUpload.mock} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <AudioViewer content={audioContentState} />
        </RichContentViewerBox>
      </Section>

      <Section title="onFilesChange Error (with UI)">
        <div>With Error Message:</div>
        <SyntaxHighlighter
          // eslint-disable-next-line max-len
          code={`handleFileUpload = (files, updateEntity) => updateEntity({ data: [], error: { msg: 'file too large' } });`}
        />
        <RichContentEditorBox>
          <AudioEditor handleFileUpload={handleFileUpload.error} />
        </RichContentEditorBox>
      </Section>
    </Page>
  </TabsWrapper>
);

export default AudioPluginStory;
