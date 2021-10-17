import { DEFAULTS } from '../defaults';
import {
  getModalStyles,
  TOOLBARS,
  BUTTON_TYPES,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';
import {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  PinterestIcon,
  YoutubeIcon,
} from '../icons';
import EmbedURLInputModal from './embedURLInputModal';
import {
  CreateInsertButtons,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { LinkPreviewPluginEditorConfig } from '../types';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
  DesktopOverlayModalStyles,
} from 'wix-rich-content-ui-components';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  isMobile,
  experiments = {},
}: {
  t: TranslationFunction;
  settings: LinkPreviewPluginEditorConfig;
  isMobile: boolean;
  experiments: AvailableExperiments;
}) => {
  const { newSocialAndVerticalEmbedModal } = experiments;
  const useNewModal = newSocialAndVerticalEmbedModal?.enabled;
  const content = isMobile
    ? {
        maxWidth: 580,
        minHeight: '100%',
        minWidth: '100%',
        margin: 0,
        alignContent: 'center',
        top: 0,
        transform: 'none',
      }
    : { maxWidth: 580, minHeight: 348 };

  const newModalCustomStyles = isMobile
    ? MOBILE_FULL_SCREEN_CUSTOM_STYLE
    : DesktopFlyOutModalStyles;

  const customStyles = useNewModal ? newModalCustomStyles : { content };

  const defaultModalStyles = getModalStyles({
    customStyles,
    fullScreen: !!useNewModal,
    isMobile,
  });

  const newModalStyles = isMobile ? defaultModalStyles : undefined;
  const modalStyles = useNewModal ? newModalStyles : defaultModalStyles;
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

  const { exposeEmbedButtons = [] } = settings;
  const socialIconsMap = {
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
    TikTok: TikTokIcon,
    Pinterest: PinterestIcon,
    YouTube: YoutubeIcon,
  };

  const baseButtonsProps = socialType => ({
    type: BUTTON_TYPES.MODAL,
    modalStylesFn,
    section: 'BlockToolbar_Section_Embed_Anywhere',
    componentData: DEFAULTS,
    name: `${socialType}_InsertButton`,
    tooltip: t(`EmbedURL_Social_${socialType}_Title`),
    getIcon: () => socialIconsMap[socialType],
    modalElement: decorateComponentWithProps(EmbedURLInputModal, {
      fetchData: settings.fetchData,
      socialType,
    }),
  });

  let socialButtons = exposeEmbedButtons.map(socialType => ({
    ...baseButtonsProps(socialType),
    toolbars: [TOOLBARS.MOBILE, TOOLBARS.FOOTER, TOOLBARS.SIDE],
    modalStyles,
  }));

  if (useNewModal) {
    const externalButtons = exposeEmbedButtons.map(socialType => ({
      ...baseButtonsProps(socialType),
      toolbars: [TOOLBARS.INSERT_PLUGIN],
      modalStyles: getModalStyles({
        customStyles: {
          ...customStyles,
          ...DesktopOverlayModalStyles,
        },
        fullScreen: false,
        isMobile,
      }),
    }));

    socialButtons = [...socialButtons, ...externalButtons];
  }

  return socialButtons;
};

export default createInsertButtons;
