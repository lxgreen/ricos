import React from 'react';
import { MultiSelectLinkViewer, BasicLinkViewer } from './LinkViewer';
import { BasicLinkEditor, BasicLinkEditorWithSettings, MultiSelectLinkEditor } from './LinkEditor';
// eslint-disable-next-line import/no-unresolved
import viewerSourcecode from '!!raw-loader!./LinkViewer.tsx';
// eslint-disable-next-line import/no-unresolved
import editorSourcecode from '!!raw-loader!./LinkEditor.tsx';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  ContentState,
  Section,
  Page,
} from '../../Components/StoryParts';
import fixtrue from '../../../../../e2e/tests/fixtures/link.json';
import MobileDetect from 'mobile-detect';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile() !== null;

export default () => {
  return (
    <Page title="Link Panel">
      <Section title="Basic Link Panel without checkboxes">
        <Section type={Section.Types.COMPARISON}>
          <RichContentEditorBox sourcecode={editorSourcecode}>
            <BasicLinkEditor isMobile={isMobile} content={fixtrue} />
          </RichContentEditorBox>
          <RichContentViewerBox sourcecode={viewerSourcecode}>
            <BasicLinkViewer isMobile={isMobile} content={fixtrue} />
          </RichContentViewerBox>
        </Section>
      </Section>
      <Section title="Basic Link Panel">
        <Section type={Section.Types.COMPARISON}>
          <RichContentEditorBox sourcecode={editorSourcecode}>
            <BasicLinkEditorWithSettings isMobile={isMobile} content={fixtrue} />
          </RichContentEditorBox>
          <RichContentViewerBox sourcecode={viewerSourcecode}>
            <BasicLinkViewer isMobile={isMobile} content={fixtrue} />
          </RichContentViewerBox>
        </Section>
      </Section>
      <Section title="Multi Select Link Panel">
        <Section type={Section.Types.COMPARISON}>
          <RichContentEditorBox sourcecode={editorSourcecode}>
            <MultiSelectLinkEditor isMobile={isMobile} content={fixtrue} />
          </RichContentEditorBox>
          <RichContentViewerBox sourcecode={viewerSourcecode}>
            <MultiSelectLinkViewer isMobile={isMobile} content={fixtrue} />
          </RichContentViewerBox>
        </Section>
        <Section title="Content State">
          <ContentState json={fixtrue} />
        </Section>
      </Section>
    </Page>
  );
};
