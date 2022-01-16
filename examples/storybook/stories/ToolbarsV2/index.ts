import { storiesOf } from '@storybook/react';
import NarrowEditorStory from './NarrowEditorStory';
import WideEditorStory from './WideEditorStory';

storiesOf('ToolbarsV2', module)
  .add('Floating in Wide Editor', WideEditorStory)
  .add('Static in Wide Editor', WideEditorStory)
  .add('Floating in Narrow Editor', NarrowEditorStory)
  .add('Static in Narrow Editor', NarrowEditorStory);
