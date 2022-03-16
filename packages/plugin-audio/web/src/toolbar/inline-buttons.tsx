import { BUTTONS } from 'wix-rich-content-plugin-commons';
import type {
  CreateInlineButtons,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
  MediaReplaceIcon,
} from 'wix-rich-content-ui-components';
import type { AudioPluginEditorConfig } from '../types';
import { decorateComponentWithProps, getModalStyles } from 'wix-rich-content-editor-common';
import AudioModal from './modals/AudioModal';
import { audioModalContentStyles } from '../consts';

const createInlineButtons: CreateInlineButtons = ({
  settings,
  isMobile,
}: {
  t: TranslationFunction;
  settings: AudioPluginEditorConfig;
  isMobile: boolean;
  experiments: AvailableExperiments;
}) => {
  const customStyles = isMobile
    ? MOBILE_FULL_SCREEN_CUSTOM_STYLE
    : { ...DesktopFlyOutModalStyles, content: audioModalContentStyles };
  const icon = settings?.toolbar?.icons?.replace || MediaReplaceIcon;

  const modalStyles = isMobile
    ? getModalStyles({
        customStyles,
        fullScreen: true,
        isMobile,
      })
    : undefined;

  return [
    { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
    { keyName: 'sizeSmallLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { keyName: 'sizeSimallRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon,
      modalElement: decorateComponentWithProps(AudioModal, settings),
      modalStyles,
      mobile: true,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({
          customStyles,
          fullScreen: true,
          isMobile,
        });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 15;
        const modalTop = top > 250 ? top - 250 : top + 38;
        return {
          ...modalStyles,
          content: {
            ...modalStyles?.content,
            top: modalTop,
            left: modalLeft,
            margin: 0,
            position: 'absolute',
          },
        };
      },
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
