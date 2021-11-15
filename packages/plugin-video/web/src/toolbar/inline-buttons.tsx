import { BUTTONS, PluginSettingsIcon } from 'wix-rich-content-plugin-commons';
import {
  getModalStyles,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import { MediaReplaceIcon } from '../icons';
import { Modals } from '../modals';
import VideoModal from './videoModal';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
} from 'wix-rich-content-ui-components';
import {
  SelectionModalCustomStyle,
  ExtendedSelectionModalCustomStyle,
} from './selectionModalCustomStyles';
import {
  CreateInlineButtons,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { VideoPluginEditorConfig, VIDEO_TYPE } from '../types';

const createInlineButtons: CreateInlineButtons = ({
  t,
  settings,
  isMobile,
  experiments = {},
}: {
  t: TranslationFunction;
  settings: VideoPluginEditorConfig;
  isMobile: boolean;
  experiments: AvailableExperiments;
}) => {
  //apply the extended input modal styles if handleFileSelection is avilable in plugin config
  //& on mobile if enableCustomUploadOnMobile is set to true, otherwise the normal modal styles is applied
  const { spoilerInInlineToolbar, newVideoModal } = experiments;
  const useNewModal = newVideoModal?.enabled;
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;

  const defaultStyles =
    (!isMobile || settings.enableCustomUploadOnMobile) &&
    (settings.handleFileSelection || settings.handleFileUpload)
      ? ExtendedSelectionModalCustomStyle
      : SelectionModalCustomStyle;

  const newModalStyles = isMobile ? MOBILE_FULL_SCREEN_CUSTOM_STYLE : DesktopFlyOutModalStyles;
  const customStyles = useNewModal ? newModalStyles : defaultStyles;

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
  const settingsButton = !spoilerInInlineToolbar?.enabled
    ? [
        {
          keyName: 'settings',
          type: BUTTONS.VIDEO_SETTINGS,
          fullHeight: true,
          icon: PluginSettingsIcon,
          modalName: Modals.VIDEO_SETTINGS,
          modalStyles: getModalStyles({
            isMobile,
          }),
          t,
          mobile: true,
          tooltipTextKey: 'SettingsButton_Tooltip',
          settings,
          triggerSettingsBi: true,
          pluginId: VIDEO_TYPE,
        },
      ]
    : [];

  return [
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { keyName: 'separator1', type: BUTTONS.SEPARATOR, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    ...spoilerButton,
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalElement: decorateComponentWithProps(VideoModal, {
        ...settings,
      }),
      modalStylesFn: ({ buttonRef, toolbarName }) => {
        return getBottomToolbarModalStyles(
          buttonRef,
          {
            customStyles,
          },
          toolbarName
        );
      },
      modalStyles: isMobile
        ? getModalStyles({
            customStyles: MOBILE_FULL_SCREEN_CUSTOM_STYLE,
            fullScreen: true,
            isMobile,
          })
        : undefined,
      mobile: true,
      tooltipTextKey: 'ReplaceVideoButton_Tooltip',
      t,
    },
    ...settingsButton,
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
