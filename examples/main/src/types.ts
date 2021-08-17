import { AvailableExperiments, AddPluginMenuConfig, FooterToolbarConfig } from 'wix-rich-content-common';

export type OnVisibilityChanged = (sectionName: string, isVisible: boolean) => void;

export interface SectionSettings {
  name: string;
  active?: any;
  getActive?: any;
  itemsType?: string;
  action: (item?: any, value?: any) => void;
  items?: string[];
}

export interface TestAppConfig {
  plugins?: string[];
  toolbarConfig?: {
    addPluginMenuConfig?: AddPluginMenuConfig;
    footerToolbarConfig?: FooterToolbarConfig;
  };
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
