import { isEmpty, get } from 'lodash';
import { BUTTONS, PluginSettingsIcon, Uploader } from 'wix-rich-content-plugin-commons';
import { getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import { MediaReplaceIcon, ImageEditorIcon } from '../icons';
import type {
  CreateInlineButtons,
  TranslationFunction,
  AnchorTarget,
  RelValue,
  UISettings,
  AvailableExperiments,
  Helpers,
  EditorPluginConfig,
} from 'wix-rich-content-common';
import type { ImagePluginEditorConfig } from '../types';
import { IMAGE_TYPE } from '../types';
import { ImagePluginService } from './imagePluginService';

const createInlineButtons: CreateInlineButtons = ({
  t,
  anchorTarget,
  relValue,
  uiSettings,
  isMobile,
  settings = {},
  experiments = {},
}: {
  t: TranslationFunction;
  settings: ImagePluginEditorConfig;
  isMobile: boolean;
  anchorTarget: AnchorTarget;
  relValue: RelValue;
  uiSettings: UISettings;
  experiments: AvailableExperiments;
}) => {
  const icons = get(settings, 'toolbar.icons', {});
  const modalStyles = getModalStyles({ isMobile });
  const imageEditorStyles = getModalStyles({
    customStyles: { content: { maxWidth: '100%', background: 'transparent' } },
  });
  const { imageEditorWixSettings, onImageEditorOpen } = settings;
  const imageEditorButton = {
    keyName: 'imageEditor',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: icons.imageEditor || ImageEditorIcon,
    modalName: Modals.IMAGE_EDITOR,
    modalStyles: imageEditorStyles,
    t,
    imageEditorWixSettings,
    onImageEditorOpen,
    mobile: false,
    tooltipTextKey: 'ImageEditorButton_Tooltip',
    mapComponentDataToButtonProps: componentData => ({
      disabled: isEmpty(componentData.src) || !!componentData.error,
    }),
  };
  const { spoilerInInlineToolbar } = experiments;
  const spoilerButton =
    settings.spoiler && spoilerInInlineToolbar?.enabled
      ? [
          {
            keyName: 'spoiler',
            type: BUTTONS.SPOILER,
            mobile: true,
          },
        ]
      : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replaceButton: any = {
    keyName: 'replace',
    type: BUTTONS.FILES,
    onFilesSelected: (pubsub, files) => {
      if (files.length > 0) {
        pubsub.getBlockHandler('handleFilesSelected')(files);
      }
    },
    icon: icons.replace || MediaReplaceIcon,
    mobile: true,
    tooltipTextKey: 'ReplaceImageButton_Tooltip',
    t,
  };

  if (experiments?.useUploadContext?.enabled) {
    replaceButton.mediaPluginService = new ImagePluginService();
    replaceButton.getUploader = (
      helpers: Helpers,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _: Record<string, any> & EditorPluginConfig
    ) => new Uploader(helpers?.handleFileUpload);
  }
  return [
    { keyName: 'sizeOriginal', type: BUTTONS.SIZE_ORIGINAL, mobile: false },
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'alignLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'alignCenter', type: BUTTONS.SIZE_CONTENT_CENTER, mobile: false },
    { keyName: 'alignRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    ...spoilerButton,
    ...(imageEditorWixSettings ? [imageEditorButton] : []),
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      fullHeight: true,
      icon: icons.settings || PluginSettingsIcon,
      modalName: Modals.IMAGE_SETTINGS,
      modalStyles,
      anchorTarget,
      relValue,
      t,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      uiSettings,
      triggerSettingsBi: true,
      pluginId: IMAGE_TYPE,
      shouldShowSpoiler: settings.spoiler,
    },
    { keyName: 'link', type: BUTTONS.LINK, mobile: true },
    replaceButton,
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
