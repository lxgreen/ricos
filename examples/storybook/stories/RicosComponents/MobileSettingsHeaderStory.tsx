import React, { useState } from 'react';
import { SettingsMobileHeader } from 'wix-rich-content-ui-components';
import { Button } from 'wix-style-react';

import { Section, Page } from '../Components/StoryParts';
import styles from './TextInputStory.scss';
export default () => {
  const [withTitle, setWithTitle] = useState(false);

  return (
    <Page>
      <Section>
        <div dir="ltr">
          <div className={styles.SettingsMobileHeader_wrapper}>
            <SettingsMobileHeader
              theme={styles}
              cancelLabel="Cancel"
              saveLabel="Save"
              title={withTitle ? 'PluginName' : ''}
              // eslint-disable-next-line no-console
              onCancel={() => console.log('Cancel')}
              // eslint-disable-next-line no-console
              onSave={() => console.log('save')}
            />
          </div>
          <Section title="Mobile Setting Header">
            import {'{ SettingsMobileHeader }'} from &apos;wix-rich-content-ui-components&apos;;
          </Section>
        </div>
      </Section>
      <div className={styles.SettingsMobileHeader_titleButton}>
        <Button onClick={() => setWithTitle(!withTitle)}>
          {withTitle ? 'With' : 'Without'} Settings Title
        </Button>
      </div>
    </Page>
  );
};
