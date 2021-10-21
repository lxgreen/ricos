import { BUTTONS } from 'wix-rich-content-plugin-commons';
import {
  getModalStyles,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import { ReplaceIcon } from '../icons';
import getModalCustomStyles from './ModalCustomStyles';
import VerticalEmbedInputModal from './VerticalEmbedInputModal';
import {
  AvailableExperiments,
  CreateInlineButtons,
  TranslationFunction,
} from 'wix-rich-content-common';
import { VerticalEmbedPluginEditorConfig } from '../types';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
} from 'wix-rich-content-ui-components';

const createInlineButtons: CreateInlineButtons = ({
  t,
  isMobile,
  settings,
  locale,
  experiments = {},
}: {
  t: TranslationFunction;
  settings: VerticalEmbedPluginEditorConfig;
  isMobile: boolean;
  locale: string;
  experiments: AvailableExperiments;
}) => {
  const { newVerticalEmbedModal } = experiments;
  const useNewModal = newVerticalEmbedModal?.enabled;

  const modalStylesFn = useNewModal
    ? ({ buttonRef, toolbarName }) => {
        return getBottomToolbarModalStyles(
          buttonRef,
          {
            customStyles,
          },
          toolbarName
        );
      }
    : undefined;

  const newModalCustomStyles = isMobile
    ? MOBILE_FULL_SCREEN_CUSTOM_STYLE
    : DesktopFlyOutModalStyles;

  const customStyles = useNewModal ? newModalCustomStyles : getModalCustomStyles(isMobile);

  const defaultModalStyles = getModalStyles({
    customStyles,
    fullScreen: !!useNewModal,
    isMobile,
  });

  const newModalStyles = isMobile ? defaultModalStyles : undefined;
  const modalStyles = useNewModal ? newModalStyles : defaultModalStyles;

  return [
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: ReplaceIcon,
      modalElement: decorateComponentWithProps(VerticalEmbedInputModal, { ...settings, locale }),
      modalStyles,
      mobile: true,
      tooltipTextKey: 'Replace product',
      t,
      modalStylesFn,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
