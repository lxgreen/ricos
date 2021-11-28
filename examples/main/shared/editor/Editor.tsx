import React, { ElementType, PureComponent } from 'react';
import { RichContentEditor, RichContentEditorProps } from 'wix-rich-content-editor';
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
  EventName,
  PluginEventParams,
  OnPluginAction,
} from 'wix-rich-content-common';
import { TestAppConfig } from '../../src/types';
import { RicosEditor, RicosEditorProps, RicosEditorType } from 'ricos-editor';

const STATIC_TOOLBAR = 'static';
let nodeId;

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
    const onPluginAction: OnPluginAction = async (
      eventName: EventName,
      params: PluginEventParams
    ) => console.log(eventName, params);
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
      onPluginAction,
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

  renderDemoToolbar = () => {
    const imageNode = {
      type: 'IMAGE',
      nodes: [],
      imageData: {
        containerData: {
          width: {
            size: 'CONTENT',
          },
          alignment: 'CENTER',
          spoiler: {
            enabled: true,
            description: 'SPOILER ALERT!!!',
            buttonText: 'What is behind door number 1?',
          },
          textWrap: false,
        },
        image: {
          src: {
            id: '8bb438_67a68c0652d740bab508f68662acc882.jpg',
          },
          width: 3192,
          height: 2124,
        },
        link: {
          url: 'www.image-link.com',
          target: 'BLANK',
        },
        caption: 'Dad holding his baby',
      },
    };

    const updatedImageNode = {
      type: 'IMAGE',
      nodes: [],
      imageData: {
        containerData: {
          width: {
            size: 'SMALL',
          },
          alignment: 'LEFT',
          spoiler: {
            enabled: true,
            description: 'SPOILER ALERT!!!',
            buttonText: 'What is behind door number 1?',
          },
          textWrap: false,
        },
        image: {
          src: {
            id: '8bb438_67a68c0652d740bab508f68662acc882.jpg',
          },
          width: 3192,
          height: 2124,
        },
        link: {
          url: 'www.image-link.com',
          target: 'BLANK',
        },
        caption: 'Dad holding his baby',
      },
    };
    if (!this.editor) {
      return null;
    }

    return (
      <div>
        {
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              nodeId = this.editor.getRicosEditorCommands().insertNode(imageNode);
              console.log('Insert Node', nodeId);
            }}
          >
            {'insert Image'}
          </button>
        }
        {
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const result = this.editor
                .getRicosEditorCommands()
                .updateNode(nodeId, updatedImageNode);
              console.log('Update Node', result);
            }}
          >
            {'update Image'}
          </button>
        }
        {
          <button
            onClick={() => {
              const result = this.editor.getRicosEditorCommands().deleteNode(nodeId);
              console.log('Delete Node', result);
            }}
          >
            {'delete Image'}
          </button>
        }
      </div>
    );
  };

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
    } = this.props;
    const textToolbarType: TextToolbarType = staticToolbar && !isMobile ? STATIC_TOOLBAR : null;
    const useStaticTextToolbar = textToolbarType === STATIC_TOOLBAR;

    return (
      <div style={{ height: '100%' }}>
        {this.renderExternalToolbar()}
        <div ref={ref => (this.staticToolbarContainer = ref)} />
        {this.renderDemoToolbar()}
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
          />
        </div>
      </div>
    );
  }
}
