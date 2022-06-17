import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../defaults';
import { InsertPluginIcon } from '../icons';
import type {
  CreateInsertButtons,
  TranslationFunction,
  AvailableExperiments,
  InsertButton,
} from 'wix-rich-content-common';
import type { FilePluginEditorConfig } from '../types';
import { FilePluginService } from './filePluginService';
import { Uploader } from 'wix-rich-content-plugin-commons';

const createInsertButtons: CreateInsertButtons = ({
  settings,
  t,
  experiments,
}: {
  t: TranslationFunction;
  settings: FilePluginEditorConfig;
  experiments?: AvailableExperiments;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInsertButton: InsertButton = {
    type: BUTTON_TYPES.FILE,
    multi: true,
    name: INSERT_PLUGIN_BUTTONS.FILE,
    tooltip: t('FileUploadInsertButton_tooltip'),
    getIcon: () => icon,
    componentData: DEFAULTS,
    toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
  };

  if (experiments?.useUploadContext?.enabled) {
    fileInsertButton.mediaPluginService = new FilePluginService();
    fileInsertButton.getUploader = () => new Uploader(settings.onFileSelected);
  }

  return [fileInsertButton];
};

export default createInsertButtons;
