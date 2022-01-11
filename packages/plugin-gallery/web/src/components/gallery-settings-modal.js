import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import {
  Tabs,
  Tab,
  LabeledToggle,
  SettingsSection,
  SettingsPanelFooter,
  FocusManager,
  SettingsMobileHeader,
  SettingsSeparator,
  SettingsPanelHeader,
} from 'wix-rich-content-ui-components';
import LayoutSelector from './gallery-controls/layouts-selector';
import styles from '../../statics/styles/gallery-settings-modal.scss';
import LayoutControlsSection from './layout-controls-section';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import { layoutData } from '../layout-data-provider';
const DIVIDER = 'divider';
class ManageMediaSection extends Component {
  constructor(props) {
    super(props);
    this.modalsWithEditorCommands = props.experiments.modalsWithEditorCommands?.enabled;
  }

  applyItems = items => {
    const { data, store, updateData } = this.props;
    const componentData = {
      ...data,
      items,
    };
    this.modalsWithEditorCommands
      ? updateData(componentData)
      : store.set('componentData', componentData);
  };

  static contextType = GlobalContext;

  handleFileChange = (files, itemPos) => {
    if (files.length > 0) {
      const handleFilesSelected = this.props.store.getBlockHandler('handleFilesSelected');
      handleFilesSelected(files, itemPos);
    }
  };

  handleFileSelection = (index, multiple) => {
    const { helpers, data, store } = this.props;
    const deleteBlock = store.get('deleteBlock');
    helpers.handleFileSelection(index, multiple, this.handleFilesAdded, deleteBlock, data);
  };

  handleFilesAdded = (...args) => {
    const { store, updateComponentData } = this.props;
    store.getBlockHandler('handleFilesAdded')?.(...args);
    this.modalsWithEditorCommands && updateComponentData();
  };

  render() {
    const {
      helpers,
      store,
      t,
      relValue,
      anchorTarget,
      isMobile,
      uiSettings,
      accept,
      updateData,
    } = this.props;
    const { handleFileSelection } = helpers;
    const { languageDir } = this.context;

    return (
      <div dir={languageDir} className={styles.gallerySettings_tab_section}>
        <SortableComponent
          theme={this.props.theme}
          items={this.props.data.items}
          onItemsChange={this.applyItems}
          handleFileChange={this.handleFileChange}
          handleFileSelection={handleFileSelection && this.handleFileSelection}
          t={t}
          relValue={relValue}
          anchorTarget={anchorTarget}
          isMobile={isMobile}
          uiSettings={uiSettings}
          accept={accept}
          experiments={this.props.experiments}
        />
      </div>
    );
  }
}

ManageMediaSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  uiSettings: PropTypes.object,
  experiments: PropTypes.object,
  languageDir: PropTypes.string,
  accept: PropTypes.string,
  updateData: PropTypes.func,
  updateComponentData: PropTypes.func,
};

class AdvancedSettingsSection extends Component {
  constructor(props) {
    super(props);
    this.modalsWithEditorCommands = props.experiments.modalsWithEditorCommands?.enabled;
  }

  applyGallerySetting = setting => {
    const { data, store, updateData } = this.props;
    const componentData = {
      ...data,
      styles: setting,
    };
    this.modalsWithEditorCommands
      ? updateData(componentData)
      : store.set('componentData', componentData);
  };

  static contextType = GlobalContext;

  switchLayout = layout => {
    this.applyGallerySetting({ ...layout, ...layoutData[layout.galleryLayout] });
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  shouldRender() {
    const { data } = this.props;
    return data && data.styles;
  }

  render() {
    const { data, store, theme, t, isMobile, updateData, experiments = {} } = this.props;
    const { languageDir } = this.context;
    return (
      this.shouldRender() && (
        <div
          className={
            isMobile
              ? styles.gallerySettings_settingsContainerMobile
              : styles.gallerySettings_tab_section
          }
          dir={languageDir}
        >
          <SettingsSection
            theme={theme}
            ariaProps={{ 'aria-label': 'layout selection', role: 'region' }}
          >
            <LayoutSelector
              theme={theme}
              value={this.getValueFromComponentStyles('galleryLayout')}
              onChange={value => this.switchLayout({ galleryLayout: value })}
              t={t}
              isMobile={isMobile}
              experiments={experiments}
            />
          </SettingsSection>
          <LayoutControlsSection
            theme={theme}
            layout={this.getValueFromComponentStyles('galleryLayout')}
            data={data}
            updateData={updateData}
            store={store}
            t={t}
            isMobile={isMobile}
            languageDir={languageDir}
            experiments={experiments}
          />
        </div>
      )
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
  experiments: PropTypes.object,
  updateData: PropTypes.func,
};
export class GallerySettingsModal extends Component {
  constructor(props) {
    super(props);
    const {
      componentData: {
        disableExpand,
        disableDownload,
        config: { spoiler = {} },
      },
      experiments,
    } = this.props;
    this.state = {
      activeTab: this.props.activeTab,
      isExpandEnabled: !disableExpand,
      isDownloadEnabled: !disableDownload,
      isSpoilerEnabled: spoiler.enabled,
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.switchTab = this.switchTab.bind(this);
    this.modalsWithEditorCommands = experiments.modalsWithEditorCommands?.enabled;
  }

  componentDidMount() {
    if (!this.modalsWithEditorCommands) {
      this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
      const componentData = this.props.pubsub.get('componentData');
      this.setState({
        initComponentData: { ...componentData, items: this.getItems(componentData.items) },
      });
    }
  }

  componentWillUnmount() {
    !this.modalsWithEditorCommands &&
      this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { pubsub, helpers } = this.props;
    if (this.state.initComponentData) {
      pubsub.set('componentData', {
        ...this.state.initComponentData,
        items: this.getItems(this.state.initComponentData.items),
      });
    }

    helpers.closeModal();
  };

  otherTab() {
    let tab = 'settings';
    if (this.state.activeTab === 'manage_media') tab = 'advanced_settings';
    if (this.state.activeTab === 'advanced_settings') tab = 'settings';
    if (this.state.activeTab === 'settings') tab = 'manage_media';
    return tab;
  }

  switchTab() {
    const otherTab = this.otherTab();
    this.setState({ activeTab: otherTab });
  }

  onTabSelected = tab => this.setState({ activeTab: tab });

  tabName(tab, t) {
    /* eslint-disable camelcase */
    return {
      manage_media: t('GallerySettings_Tab_ManageMedia'),
      advanced_settings: t('GallerySettings_Tab_AdvancedSettings'),
      settings: t('GallerySettings_Tab_Settings'),
    }[tab];
  }

  getItems = items => {
    return items.map(item => {
      // eslint-disable-next-line fp/no-delete
      delete item.selected;
      return item;
    });
  };

  onDoneClick = () => {
    const { helpers, pubsub } = this.props;
    const componentData = pubsub.get('componentData');
    const newComponentData = {
      ...componentData,
      items: this.getItems(componentData.items),
      ...this.getSpoilerConfig(this.state.isSpoilerEnabled),
      disableDownload: !this.state.isDownloadEnabled,
      disableExpand: !this.state.isExpandEnabled,
    };
    pubsub.update('componentData', newComponentData);
    helpers.closeModal();
  };

  toggleState = (key, onToggle) => () => {
    const value = !this.state[key];
    this.setState({ [key]: value }, onToggle?.(value));
  };

  getSpoilerConfig = enabled => ({
    config: {
      ...(this.modalsWithEditorCommands
        ? this.props.componentData.config
        : this.componentData.config),
      spoiler: { enabled },
    },
  });

  tabsList = () => ({
    mangeMedia: (
      <Tab
        label={this.tabName('manage_media', this.props.t)}
        value={'manage_media'}
        theme={this.props.theme}
      >
        <ManageMediaSection
          data={
            this.modalsWithEditorCommands
              ? this.props.componentData
              : this.props.pubsub.get('componentData')
          }
          store={this.props.pubsub.store}
          helpers={this.props.helpers}
          theme={this.props.theme}
          t={this.props.t}
          anchorTarget={this.props.anchorTarget}
          relValue={this.props.relValue}
          uiSettings={this.props.uiSettings}
          accept={this.props.accept}
          updateData={this.props.updateData}
          experiments={this.props.experiments}
          updateComponentData={this.props.updateComponentData}
        />
      </Tab>
    ),
    advancedSettings: (
      <Tab
        label={this.tabName('advanced_settings', this.props.t)}
        value={'advanced_settings'}
        theme={this.props.theme}
      >
        <AdvancedSettingsSection
          theme={this.props.theme}
          data={
            this.modalsWithEditorCommands
              ? this.props.componentData
              : this.props.pubsub.get('componentData')
          }
          store={this.props.pubsub.store}
          helpers={this.props.helpers}
          t={this.props.t}
          languageDir={this.props.languageDir}
          updateData={this.props.updateData}
          experiments={this.props.experiments}
        />
      </Tab>
    ),
    settings: (
      <Tab
        label={this.tabName('settings', this.props.t)}
        value={'settings'}
        theme={this.props.theme}
      >
        <div className={this.styles.gallerySettings_tab_section}>
          {this.toggleData.map(this.renderToggle)}
        </div>
      </Tab>
    ),
  });

  tabsToRender = () =>
    this.props.isMobile
      ? [this.tabsList().mangeMedia, this.tabsList().settings]
      : [this.tabsList().mangeMedia, this.tabsList().advancedSettings, this.tabsList().settings];

  renderToggle = ({
    toggleKey,
    labelKey,
    tooltipText,
    dataHook,
    onChange,
    type,
    isChecked,
    onToggle,
  }) =>
    type === DIVIDER ? (
      <SettingsSeparator top />
    ) : (
      <LabeledToggle
        key={toggleKey}
        theme={this.props.theme}
        checked={this.modalsWithEditorCommands ? isChecked() : this.state[toggleKey]}
        label={this.props.t(labelKey)}
        dataHook={dataHook}
        onChange={this.modalsWithEditorCommands ? onChange : this.toggleState(toggleKey, onToggle)}
        tooltipText={tooltipText}
      />
    );

  baseToggleData = [
    {
      toggleKey: 'isExpandEnabled',
      labelKey: 'GalleryPlugin_Settings_ImagesOpenInExpandMode_Label',
      dataHook: 'galleryExpandToggle',
      tooltipText: this.props.t('GallerySettings_Expand_Mode_Toggle'),
      isChecked: () => !this.props.componentData.disableExpand,
      onChange: () =>
        this.props.updateData({ disableExpand: !this.props.componentData.disableExpand }),
    },
    {
      toggleKey: 'isDownloadEnabled',
      labelKey: 'GalleryPlugin_Settings_ImagesCanBeDownloaded_Label',
      dataHook: 'imageDownloadToggle',
      tooltipText: this.props.t('GalleryPlugin_Settings_ImagesCanBeDownloaded_Tooltip'),
      isChecked: () => !this.props.componentData.disableDownload,
      onChange: () =>
        this.props.updateData({ disableDownload: !this.props.componentData.disableDownload }),
    },
  ];

  toggleData = this.props.shouldShowSpoiler
    ? [
        ...this.baseToggleData,
        {
          type: DIVIDER,
        },
        {
          toggleKey: 'isSpoilerEnabled',
          labelKey: 'GallerySettings_Spoiler_Toggle',
          dataHook: 'gallerySpoilerToggle',
          tooltipText: this.props.t('Spoiler_Toggle_Tooltip'),
          onToggle: value =>
            this.props.pubsub.update('componentData', {
              ...this.componentData,
              ...this.getSpoilerConfig(value),
            }),
          isChecked: () => this.props.componentData.config?.spoiler?.enabled,
          onChange: () => {
            this.props.updateData({
              ...this.props.componentData,
              ...this.getSpoilerConfig(!this.props.componentData.config?.spoiler?.enabled),
            });
          },
        },
      ]
    : this.baseToggleData;

  render() {
    const styles = this.styles;
    const {
      t,
      isMobile,
      languageDir,
      pubsub,
      theme,
      onCancel,
      onSave,
      experiments = {},
    } = this.props;
    const { activeTab } = this.state;
    this.componentData = pubsub.get('componentData');

    return (
      <div data-hook="settings" dir={languageDir}>
        {isMobile && (
          <SettingsMobileHeader
            theme={theme}
            onCancel={this.modalsWithEditorCommands ? onCancel : this.revertComponentData}
            onSave={this.modalsWithEditorCommands ? onSave : this.onDoneClick}
            t={t}
            title={experiments?.newSettingsUi?.enabled && t('GallerySettings_Header')}
          />
        )}
        <FocusManager
          focusTrapOptions={{ initialFocus: `#${activeTab}_header` }}
          className={styles.gallerySettings}
          dir={languageDir}
        >
          {!isMobile &&
            (experiments?.newSettingsUi?.enabled ? (
              <SettingsPanelHeader
                title={t('GallerySettings_Header')}
                onClose={this.revertComponentData}
              />
            ) : (
              <div className={styles.gallerySettings_title}>{t('GallerySettings_Header')}</div>
            ))}
          <div className={styles.gallerySettings_tabsContainer}>
            <Tabs value={activeTab} theme={this.props.theme} onTabSelected={this.onTabSelected}>
              {this.tabsToRender().map(tab => tab)}
            </Tabs>
          </div>
          {!isMobile && (
            <SettingsPanelFooter
              fixed
              cancel={this.modalsWithEditorCommands ? onCancel : this.revertComponentData}
              save={this.modalsWithEditorCommands ? onSave : this.onDoneClick}
              theme={this.props.theme}
              t={t}
            />
          )}
        </FocusManager>
      </div>
    );
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings', 'settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
  uiSettings: PropTypes.object,
  experiments: PropTypes.object,
  languageDir: PropTypes.string,
  accept: PropTypes.string,
  shouldShowSpoiler: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  updateData: PropTypes.func,
  updateComponentData: PropTypes.func,
};

export default GallerySettingsModal;
