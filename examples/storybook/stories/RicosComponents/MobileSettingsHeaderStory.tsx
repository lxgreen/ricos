import React, { useState } from 'react';
import { SettingsMobileHeader } from 'wix-rich-content-ui-components';
import { Button } from 'wix-style-react';

import { Section, Page } from '../Components/StoryParts';
import styles from './TextInputStory.scss';
export default () => {
  const [withMoreTab, setMoreTab] = useState(false);

  return (
    <Page title="Mobile Setting Header">
      <Section>
        <div className={styles.container} dir="ltr">
          <div>
            import {'{ SettingsMobileHeader }'} from &apos;wix-rich-content-plugin-commons&apos;;
          </div>
          <Button onClick={() => setMoreTab(!withMoreTab)}>
            {withMoreTab ? 'Without' : 'With'} More Tab
          </Button>
          <div className={styles.section} style={{ position: 'relative' }}>
            <SettingsMobileHeader
              theme={styles}
              cancelLabel="Cancel"
              saveLabel="Save"
              // eslint-disable-next-line no-console
              onCancel={() => console.log('Cancel')}
              // eslint-disable-next-line no-console
              onSave={() => console.log('save')}
            />
          </div>
        </div>
      </Section>
    </Page>
  );
};
