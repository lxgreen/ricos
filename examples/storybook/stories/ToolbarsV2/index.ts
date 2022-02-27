import { storiesOf } from '@storybook/react';
import WideEditorStory from './WideEditorStory';
import WideEditorStoryWithDetachCommands from './WideEditorStoryWithDetachCommands';

storiesOf('ToolbarsV2', module).add('Floating in Wide Editor', WideEditorStory);
storiesOf('ToolbarsV2', module).add(
  'Floating in Wide Editor With Detach Commands',
  WideEditorStoryWithDetachCommands
);
