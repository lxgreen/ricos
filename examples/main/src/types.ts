import {
  AvailableExperiments,
  AddPluginMenuConfig,
  FooterToolbarConfig,
} from 'wix-rich-content-common';

export type OnVisibilityChanged = (sectionName: string, isVisible: boolean) => void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SectionSettings {
  name: string;
  active?: any;
  getActive?: any;
  itemsType?: string;
  action: (item?: any, value?: any) => void;
  items?: any[];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface TestAppConfig {
  plugins?: string[];
  toolbarConfig?: {
    addPluginMenuConfig?: AddPluginMenuConfig;
    footerToolbarConfig?: FooterToolbarConfig;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pluginsConfig?: Record<string, Record<string, any>>;
  consumer?: string;
  applyOuterStyle?: boolean;
  theme?: {
    paletteType?: 'light' | 'dark';
    skipCssOverride?: boolean;
    useCustomStyles?: boolean;
    fallbackColor?: string;
    disableContainer?: boolean;
    contentBgColor?: boolean;
    settingsActionColor?: string;
    focusActionColor?: string;
  };
  showDefaultPreview?: boolean;
  isNativeUpload?: boolean;
  experiments?: AvailableExperiments;
}
