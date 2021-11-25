import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { getModalStyles } from 'wix-rich-content-editor-common';
import { Modals } from '../modals';
import {
  CreateInlineButtons,
  TranslationFunction,
  EditorContextType,
} from 'wix-rich-content-common';
import { COLLAPSIBLE_LIST_TYPE } from '../types';

const modalStyles = {
  customStyles: {
    overlay: {
      backgroundColor: 'transparent',
    },
    content: {
      borderRadius: 'var(--ricos-settings-whitebox-border-radius, 2px)',
      boxShadow: 'var(--ricos-settings-whitebox-box-shadow)',
      border: 'solid 1px rgba(255, 255, 255, 0.25)',
    },
  },
};

const createInlineButtons: CreateInlineButtons = ({
  t,
  disableKeyboardEvents,
}: {
  t: TranslationFunction;
  disableKeyboardEvents: EditorContextType['disableKeyboardEvents'];
}) => {
  return [
    {
      keyName: 'settings',
      type: BUTTONS.EXTERNAL_MODAL,
      fullHeight: true,
      modalName: Modals.COLLAPSIBLE_LIST_MODAL,
      children: t('CollapsibleList_CollapsibleListSettings_Tab_Settings_TabName'),
      modalStyles: getModalStyles(modalStyles),
      t,
      mobile: true,
      triggerSettingsBi: true,
      pluginId: COLLAPSIBLE_LIST_TYPE,
    },
    { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },
    {
      keyName: 'delete',
      type: BUTTONS.DELETE,
      mobile: true,
      beforeOnClickDelete: () => {
        disableKeyboardEvents?.(false);
      },
    },
  ];
};

export default createInlineButtons;
