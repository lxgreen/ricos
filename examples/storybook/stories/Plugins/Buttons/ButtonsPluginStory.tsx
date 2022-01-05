import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import ButtonsContentState from '../../../../../e2e/tests/fixtures/buttons.json';
import ButtonsEditor from './ButtonsEditor';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from '!!raw-loader!./ButtonsEditor.tsx';
import ButtonsViewer from './ButtonsViewer';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from '!!raw-loader!./ButtonsViewer.tsx';
import TabsWrapper from '../../Components/TabsWrapper';
import apiData from '../apiData';

export default () => {
  return (
    <TabsWrapper apiData={apiData.BUTTON}>
      <Page title="Buttons Plugin">
        <h3>There are two types of buttons:</h3>
        <h4>1. Link Button - basically a link in a shape of a button</h4>
        <h4>
          2. Action Button - by passing an `onClick` prop callback, when clicking the button it
          triggers the `onClick` action
        </h4>
        <Section type={Section.Types.COMPARISON}>
          <RichContentEditorBox sourcecode={editorSourcecode} content={ButtonsContentState}>
            <ButtonsEditor content={ButtonsContentState} />
          </RichContentEditorBox>
          <RichContentViewerBox sourcecode={viewerSourcecode}>
            <ButtonsViewer content={ButtonsContentState} />
          </RichContentViewerBox>
        </Section>
      </Page>
    </TabsWrapper>
  );
};
