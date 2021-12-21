import React, { ElementType, PureComponent } from 'react';
import { RichContentEditorProps } from 'wix-rich-content-editor';
import { testVideos } from '../../../storybook/src/shared/utils/mock';
import * as Plugins from './EditorPlugins';
import theme from '../theme/theme'; // must import after custom styles
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import {
  mockImageUploadFunc,
  mockImageNativeUploadFunc,
} from '../../../storybook/src/shared/utils/fileUploadUtil';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import {
  DraftContent,
  TextToolbarType,
  AvailableExperiments,
  OnPluginAction,
} from 'wix-rich-content-common';
import { TestAppConfig } from '../../src/types';
import { RicosEditor, RicosEditorProps, RicosEditorType } from 'ricos-editor';
import createSideBlockComponent from '../../src/Components/createSideBlockComponent';

const STATIC_TOOLBAR = 'static';

interface ExampleEditorProps {
  theme?: RichContentEditorProps['theme'];
  isMobile?: boolean;
  staticToolbar?: boolean;
  externalToolbarToShow: TOOLBARS;
  locale?: string;
  externalToolbar?: ElementType;
  shouldNativeUpload?: boolean;
  scrollingElementFn?: () => Element;
  testAppConfig?: TestAppConfig;
  mockImageIndex?: number;
  contentState?: DraftContent;
  injectedContent?: DraftContent;
  onRicosEditorChange?: RicosEditorProps['onChange'];
  experiments?: AvailableExperiments;
  externalPopups: boolean;
  textWrap?: boolean;
  showSideBlockComponent?: boolean;
}

export default class Editor extends PureComponent<ExampleEditorProps> {
  getToolbarSettings: RichContentEditorProps['config']['getToolbarSettings'];

  helpers: RichContentEditorProps['helpers'];

  editor: RicosEditorType;

  ricosPlugins: RicosEditorProps['plugins'];

  staticToolbarContainer: HTMLDivElement;

  constructor(props: ExampleEditorProps) {
    super(props);
    this.initEditorProps();
    const { scrollingElementFn, testAppConfig = {} } = props;
    const { toolbarConfig } = testAppConfig;
    const additionalConfig = {
      [GALLERY_TYPE]: { scrollingElement: scrollingElementFn },
      ...(testAppConfig.pluginsConfig || {}),
    };

    const pluginsConfig = Plugins.getConfig(additionalConfig, props.shouldNativeUpload);

    if (toolbarConfig) {
      const getToolbarSettings = toolbarConfig.addPluginMenuConfig
        ? () => [
            { name: 'SIDE', addPluginMenuConfig: toolbarConfig.addPluginMenuConfig },
            { name: 'MOBILE', addPluginMenuConfig: toolbarConfig.addPluginMenuConfig },
          ]
        : () => [];
      pluginsConfig.getToolbarSettings = getToolbarSettings;
    }

    this.getToolbarSettings = pluginsConfig.getToolbarSettings;
    this.ricosPlugins = Object.entries(Plugins.ricosEditorPlugins).map(([pluginType, plugin]) =>
      pluginType in pluginsConfig ? plugin(pluginsConfig[pluginType]) : plugin()
    );
  }

  initEditorProps() {
    /* eslint-disable no-console */
    this.helpers = {
      //these are for testing purposes only
      onPluginAdd: async (...args) => console.log('onPluginAdd', ...args),
      onPluginAddStep: async params => console.log('onPluginAddStep', params),
      onPluginAddSuccess: async (...args) => console.log('onPluginAddSuccess', ...args),
      onPluginDelete: async params => console.log('onPluginDelete', params),
      onPluginChange: async (...args) => console.log('onPluginChange', ...args),
      onPublish: async (...args) => console.log('onPublish', ...args),
      onOpenEditorSuccess: async (...args) => console.log('onOpenEditorSuccess', ...args),
      onContentEdited: async params => console.log('onContentEdited', params),
      onToolbarButtonClick: async params => console.log('onToolbarButtonClick', params),
      onKeyboardShortcutAction: async params => console.log('onKeyboardShortcutAction', params),
      onPluginModalOpened: async params => console.log('onPluginModalOpened', params),
      onMenuLoad: async params => console.log('onMenuLoad', params),
      onInlineToolbarOpen: async params => console.log('onInlineToolbarOpen', params),
      //
      // handleFileUpload: mockImageNativeUploadFunc,
      handleFileSelection: mockImageUploadFunc,
      onVideoSelected: (url, updateEntity) => {
        //todo should be moved to videoConfig (breaking change)
        const mockTimout = isNaN(this.props.mockImageIndex) ? null : 1;
        setTimeout(() => {
          const mockVideoIndex =
            this.props.mockImageIndex || Math.floor(Math.random() * testVideos.length);
          const testVideo = testVideos[mockVideoIndex];
          updateEntity(testVideo);
        }, mockTimout || 500);
      },
      onPluginAction: async (eventName, params) => console.log(eventName, params),
    };
    /* eslint-enable no-console */
    this.setImageUploadHelper();
  }

  setImageUploadHelper = () => {
    const { shouldNativeUpload } = this.props;
    if (shouldNativeUpload) {
      this.helpers.handleFileUpload = mockImageNativeUploadFunc;
      // eslint-disable-next-line fp/no-delete
      delete this.helpers.handleFileSelection;
    } else {
      this.helpers.handleFileSelection = mockImageUploadFunc;
      // eslint-disable-next-line fp/no-delete
      delete this.helpers.handleFileUpload;
    }
  };

  renderExternalToolbar() {
    const { externalToolbar: ExternalToolbar, externalToolbarToShow } = this.props;
    if (ExternalToolbar && this.editor) {
      return (
        <div className="toolbar">
          <ExternalToolbar {...this.editor.getToolbarProps(externalToolbarToShow)} theme={theme} />
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      staticToolbar,
      isMobile,
      locale,
      contentState,
      injectedContent,
      onRicosEditorChange,
      experiments,
      externalPopups,
      textWrap,
      showSideBlockComponent,
    } = this.props;
    const textToolbarType: TextToolbarType = staticToolbar && !isMobile ? STATIC_TOOLBAR : null;
    const useStaticTextToolbar = textToolbarType === STATIC_TOOLBAR;

    return (
      <div style={{ height: '100%' }}>
        {this.renderExternalToolbar()}
        <div ref={ref => (this.staticToolbarContainer = ref)} />
        <div className="editor">
          <RicosEditor
            ref={ref => (this.editor = ref)}
            onChange={onRicosEditorChange}
            content={contentState}
            injectedContent={injectedContent}
            locale={locale}
            cssOverride={theme}
            toolbarSettings={{
              useStaticTextToolbar,
              textToolbarContainer: useStaticTextToolbar && this.staticToolbarContainer,
              getToolbarSettings: this.getToolbarSettings,
            }}
            isMobile={isMobile}
            placeholder={'Add some text!'}
            plugins={this.ricosPlugins}
            linkPanelSettings={{ ...(Plugins.uiSettings.linkPanel || {}), externalPopups }}
            _rcProps={{ helpers: this.helpers }}
            experiments={experiments}
            textWrap={textWrap}
            onAtomicBlockFocus={d => console.log('onAtomicBlockFocus', d)} // eslint-disable-line
            sideBlockComponent={
              showSideBlockComponent && createSideBlockComponent(this.editor?.getEditorCommands())
            }
          />
        </div>
      </div>
    );
  }
}
