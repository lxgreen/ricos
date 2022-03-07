import { storiesOf } from '@storybook/react';
import WideEditorStory from './WideEditorStory';
import DraftWithDetachCommands from './DraftWithDetachCommands';
import TiptapWithDetachCommands from './TiptapWithDetachCommands';

storiesOf('ToolbarsV2', module).add('Floating in Wide Editor', WideEditorStory);
storiesOf('ToolbarsV2', module).add('Draft Editor With Detach Commands', DraftWithDetachCommands);
storiesOf('ToolbarsV2', module).add('Tiptap Editor With Detach Commands', TiptapWithDetachCommands);
