import { TOOLBARS, INSERT_PLUGIN_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import { DEFAULTS } from '../gallery-component';
import { InsertPluginIcon } from '../icons';
import type {
  CreateInsertButtons,
  TranslationFunction,
  Helpers,
  EditorPluginConfig,
  AvailableExperiments,
  InsertButton,
} from 'wix-rich-content-common';
import type { GalleryPluginEditorConfig } from '../types';
import { GalleryPluginService } from './galleryPluginService';
import { Uploader } from 'wix-rich-content-plugin-commons';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  disableDownload,
  disableExpand,
  experiments,
}: {
  t: TranslationFunction;
  settings: GalleryPluginEditorConfig;
  disableDownload?: boolean;
  disableExpand?: boolean;
  experiments?: AvailableExperiments;
}) => {
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || InsertPluginIcon;
  const pluginData = disableDownload !== undefined ? { ...DEFAULTS, disableDownload } : DEFAULTS;
  const componentData = disableExpand !== undefined ? { ...pluginData, disableExpand } : pluginData;

  const galleryInsertButton: InsertButton = {
    type: BUTTON_TYPES.FILE,
    multi: true,
    name: INSERT_PLUGIN_BUTTONS.GALLERY,
    tooltip: t('GalleryPlugin_InsertButton_Tooltip'),
    getIcon: () => icon,
    componentData,
    toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
  };

  if (experiments?.useUploadContext?.enabled) {
    galleryInsertButton.mediaPluginService = new GalleryPluginService();
    galleryInsertButton.getUploader = (
      helpers: Helpers,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: Record<string, any> & EditorPluginConfig
    ) => new Uploader(helpers?.handleFileUpload);
  }

  return [galleryInsertButton];
};

export default createInsertButtons;
