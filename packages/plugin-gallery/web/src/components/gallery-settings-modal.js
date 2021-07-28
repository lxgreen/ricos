import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import {
  Tabs,
  Tab,
  LabeledToggle,
  SettingsSection,
  SettingsPanelFooter,
  FocusManager,
} from 'wix-rich-content-ui-components';
import LayoutSelector from './gallery-controls/layouts-selector';
import styles from '../../statics/styles/gallery-settings-modal.scss';
import LayoutControlsSection from './layout-controls-section';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import { layoutData } from '../../lib/layout-data-provider';
import GallerySettingsMobileHeader from './gallery-controls/gallery-settings-mobile-header';
const DIVIDER = 'divider';
class ManageMediaSection extends Component {
  applyItems = items => {
    const { data, updateData } = this.props;
    const componentData = { ...data, items };
    updateData(componentData);
  };

  handleFileChange = (files, itemPos) => {
    if (files.length > 0) {
      const handleFilesSelected = this.props.store.getBlockHandler('handleFilesSelected');
      handleFilesSelected(files, itemPos);
    }
  };

  handleFileSelection = (index, multiple, deleteBlock) => {
    const { helpers, data, store, updateData } = this.props;
    const handleFilesAdded = store.getBlockHandler('handleFilesAdded');
    helpers.handleFileSelection(index, multiple, handleFilesAdded, deleteBlock, data);
    updateData({ items: store.get('componentData').items });
  };

  render() {
    const {
      helpers,
      t,
      relValue,
      anchorTarget,
      isMobile,
      uiSettings,
      languageDir,
      accept,
      deleteBlock,
    } = this.props;
    const { handleFileSelection } = helpers;
    return (
      <div dir={languageDir}>
        <SortableComponent
          theme={this.props.theme}
          items={this.props.data.items}
          onItemsChange={this.applyItems}
          handleFileChange={this.handleFileChange}
          handleFileSelection={handleFileSelection && this.handleFileSelection}
          deleteBlock={deleteBlock}
          t={t}
          relValue={relValue}
          anchorTarget={anchorTarget}
          isMobile={isMobile}
          uiSettings={uiSettings}
          accept={accept}
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
  languageDir: PropTypes.string,
  accept: PropTypes.string,
  deleteBlock: PropTypes.func,
  updateData: PropTypes.func,
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, updateData } = this.props;
    const componentData = { ...data, styles: setting };
    updateData(componentData);
  };

  switchLayout = layout => {
    this.applyGallerySetting({ ...layout, ...layoutData[layout.galleryLayout] });
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  shouldRender() {
    const { data } = this.props;
    return data && data.styles;
  }

  render() {
    const { data, updateData, theme, t, isMobile, languageDir } = this.props;
    return (
      this.shouldRender() && (
        <div
          className={
            isMobile
              ? styles.gallerySettings_settingsContainerMobile
              : styles.gallerySettings_settingsContainer
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
            />
          </SettingsSection>
          <LayoutControlsSection
            theme={theme}
            layout={this.getValueFromComponentStyles('galleryLayout')}
            data={data}
            updateData={updateData}
            t={t}
            isMobile={isMobile}
          />
        </div>
      )
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
};
export class GallerySettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: this.props.activeTab };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  switchTab = () => {
    const tabsMapper = {
      manage_media: 'advanced_settings',
      advanced_settings: 'settings',
      settings: 'manage_media',
    };
    this.setState({ activeTab: tabsMapper[this.state.activeTab] || 'settings' });
  };

  onTabSelected = tab => this.setState({ activeTab: tab });

  tabName(tab, t) {
    /* eslint-disable camelcase */
    return {
      manage_media: t('GallerySettings_Tab_ManageMedia'),
      advanced_settings: t('GallerySettings_Tab_AdvancedSettings'),
      settings: t('GallerySettings_Tab_Settings'),
    }[tab];
  }

  getSpoilerConfig = enabled => ({
    config: {
      ...this.props.componentData.config,
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
          deleteBlock={this.props.deleteBlock}
          updateData={this.props.updateData}
          data={this.props.componentData}
          store={this.props.pubsub.store}
          helpers={this.props.helpers}
          theme={this.props.theme}
          t={this.props.t}
          anchorTarget={this.props.anchorTarget}
          relValue={this.props.relValue}
          uiSettings={this.props.uiSettings}
          accept={this.props.accept}
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
          updateData={this.props.updateData}
          data={this.props.componentData}
          store={this.props.pubsub.store}
          helpers={this.props.helpers}
          t={this.props.t}
        />
      </Tab>
    ),
    settings: (
      <Tab
        label={this.tabName('settings', this.props.t)}
        value={'settings'}
        theme={this.props.theme}
      >
        {this.toggleData.map(toggle => this.renderToggle(toggle))}
      </Tab>
    ),
  });

  tabsToRender = () =>
    this.props.isMobile
      ? [this.tabsList().mangeMedia, this.tabsList().settings]
      : [this.tabsList().mangeMedia, this.tabsList().advancedSettings, this.tabsList().settings];

  renderToggle = ({ isChecked, labelKey, tooltipText, dataHook, onToggle, type }) =>
    type === DIVIDER ? (
      <div className={this.styles.divider} />
    ) : (
      <LabeledToggle
        key={labelKey}
        theme={this.props.theme}
        checked={isChecked()}
        label={this.props.t(labelKey)}
        dataHook={dataHook}
        onChange={() => onToggle(!isChecked())}
        tooltipText={tooltipText}
      />
    );

  baseToggleData = [
    {
      isChecked: () => !this.props.componentData.disableExpand,
      labelKey: 'GalleryPlugin_Settings_ImagesOpenInExpandMode_Label',
      dataHook: 'galleryExpandToggle',
      tooltipText: this.props.t('GallerySettings_Expand_Mode_Toggle'),
      onToggle: value => this.props.updateData({ disableExpand: !value }),
    },
    {
      isChecked: () => !this.props.componentData.disableDownload,
      labelKey: 'GalleryPlugin_Settings_ImagesCanBeDownloaded_Label',
      dataHook: 'imageDownloadToggle',
      tooltipText: this.props.t('GalleryPlugin_Settings_ImagesCanBeDownloaded_Tooltip'),
      onToggle: value => this.props.updateData({ disableDownload: !value }),
    },
  ];

  toggleData = this.props.shouldShowSpoiler
    ? [
        ...this.baseToggleData,
        {
          type: DIVIDER,
        },
        {
          isChecked: () => this.props.componentData.config.spoiler?.enabled,
          labelKey: 'GallerySettings_Spoiler_Toggle',
          dataHook: 'gallerySpoilerToggle',
          tooltipText: this.props.t('Spoiler_Toggle_Tooltip'),
          onToggle: value => this.props.updateData(this.getSpoilerConfig(value)),
        },
      ]
    : this.baseToggleData;

  render() {
    const styles = this.styles;
    const { t, isMobile, languageDir, onSave, onCancel } = this.props;
    const { activeTab } = this.state;

    return (
      <div data-hook="settings" dir={languageDir}>
        {isMobile && (
          <GallerySettingsMobileHeader
            theme={this.props.theme}
            cancel={onCancel}
            save={onSave}
            switchTab={this.switchTab}
            otherTab={this.tabName(this.otherTab(), t)}
            t={t}
          />
        )}
        <FocusManager
          focusTrapOptions={{ initialFocus: `#${activeTab}_header` }}
          className={styles.gallerySettings}
          dir={languageDir}
        >
          {!isMobile && (
            <div className={styles.gallerySettings_title}>{t('GallerySettings_Header')}</div>
          )}
          <div className={styles.gallerySettings_tabsContainer}>
            <Tabs value={activeTab} theme={this.props.theme} onTabSelected={this.onTabSelected}>
              {this.tabsToRender().map(tab => tab)}
            </Tabs>
          </div>
          {!isMobile && (
            <SettingsPanelFooter
              fixed
              cancel={onCancel}
              save={onSave}
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
  languageDir: PropTypes.string,
  accept: PropTypes.string,
  shouldShowSpoiler: PropTypes.bool,
  updateData: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  deleteBlock: PropTypes.func,
};

export default GallerySettingsModal;
