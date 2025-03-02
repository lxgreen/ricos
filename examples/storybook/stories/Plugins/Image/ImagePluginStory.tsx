import React, { useState } from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import imageContentState from '../../../../../e2e/tests/fixtures/images.json';
import ImageEditor from './ImageEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from './ImageEditor.tsx?raw';
import ImageViewer from './ImageViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from './ImageViewer.tsx?raw';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import { mockImageNativeUploadFunc } from '../../../src/shared/utils/fileUploadUtil';
import ActionButton from '../../Components/ActionButton';

const mockErrorMsg = 'file too large';
const handleFileUploadMockError = (files, updateEntity) => {
  setTimeout(() => {
    updateEntity({ error: { msg: mockErrorMsg } });
  }, 2000);
};

const ImagePluginStory = () => {
  const [isExpandDisabled, setIsExpandDisabled] = useState(false);
  return (
    <Page title="Image Plugin">
      <ActionButton
        text={`${isExpandDisabled ? 'Enable' : 'Disable'} expand`}
        onClick={() => setIsExpandDisabled(!isExpandDisabled)}
      />
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox sourcecode={editorSourcecode} content={imageContentState}>
          <ImageEditor content={imageContentState} handleFileUpload={mockImageNativeUploadFunc} />
        </RichContentEditorBox>
        <RichContentViewerBox sourcecode={viewerSourcecode}>
          <ImageViewer
            content={imageContentState}
            imageConfig={{ disableExpand: isExpandDisabled }}
          />
        </RichContentViewerBox>
      </Section>

      <Section title="handleFileUpload Error (with UI)">
        <div>With Error Message:</div>
        <SyntaxHighlighter
          // eslint-disable-next-line max-len
          code={`handleFileUpload = (files, updateEntity) => updateEntity({ data: [], error: { msg: ${mockErrorMsg} } });`}
        />
        <RichContentEditorBox>
          <ImageEditor handleFileUpload={handleFileUploadMockError} />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};

export default ImagePluginStory;
