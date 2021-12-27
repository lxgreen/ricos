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
import classNames from 'classnames';
const DIVIDER = 'divider';
class ManageMediaSection extends Component {
  applyItems = items => {
    const { data, updateData } = this.props;
    const componentData = {
      ...data,
      items,
    };
    updateData(componentData);
  };

  static contextType = GlobalContext;

  handleFileChange = (files, itemPos) => {
    if (files.length > 0) {
      const handleFilesSelected = this.props.store.getBlockHandler('handleFilesSelected');
      handleFilesSelected(files, itemPos);
    }
  };

  handleFileSelection = (index, multiple, handleFilesAdded, deleteBlock) => {
    const { helpers, data } = this.props;
    helpers.handleFileSelection(index, multiple, handleFilesAdded, deleteBlock, data);
  };

  render() {
    const { helpers, store, t, relValue, anchorTarget, isMobile, uiSettings, accept } = this.props;
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
          handleFilesAdded={store.getBlockHandler('handleFilesAdded')}
          deleteBlock={store.get('deleteBlock')}
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
  updateData: PropTypes.func,
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, updateData } = this.props;
    const componentData = {
      ...data,
      styles: setting,
    };
    updateData(componentData);
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
    const { data, theme, t, isMobile, updateData } = this.props;
    const { languageDir } = this.context;
    return (
      this.shouldRender() && (
        <div className={styles.gallerySettings_tab_section} dir={languageDir}>
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
            languageDir={languageDir}
          />
        </div>
      )
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
  updateData: PropTypes.func,
};
export class GallerySettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab,
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.switchTab = this.switchTab.bind(this);
  }

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
          data={this.props.componentData}
          store={this.props.pubsub.store}
          helpers={this.props.helpers}
          theme={this.props.theme}
          t={this.props.t}
          anchorTarget={this.props.anchorTarget}
          relValue={this.props.relValue}
          uiSettings={this.props.uiSettings}
          accept={this.props.accept}
          updateData={this.props.updateData}
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
          data={this.props.componentData}
          store={this.props.pubsub.store}
          helpers={this.props.helpers}
          t={this.props.t}
          languageDir={this.props.languageDir}
          updateData={this.props.updateData}
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

  renderToggle = ({ labelKey, tooltipText, dataHook, onChange, type, isChecked }) =>
    type === DIVIDER ? (
      <SettingsSeparator top />
    ) : (
      <LabeledToggle
        key={labelKey}
        theme={this.props.theme}
        checked={isChecked()}
        label={this.props.t(labelKey)}
        dataHook={dataHook}
        onChange={onChange}
        tooltipText={tooltipText}
      />
    );

  baseToggleData = [
    {
      labelKey: 'GalleryPlugin_Settings_ImagesOpenInExpandMode_Label',
      dataHook: 'galleryExpandToggle',
      tooltipText: this.props.t('GallerySettings_Expand_Mode_Toggle'),
      isChecked: () => !this.props.componentData.disableExpand,
      onChange: () =>
        this.props.updateData({ disableExpand: !this.props.componentData.disableExpand }),
    },
    {
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
          labelKey: 'GallerySettings_Spoiler_Toggle',
          dataHook: 'gallerySpoilerToggle',
          tooltipText: this.props.t('Spoiler_Toggle_Tooltip'),
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
    const { t, isMobile, languageDir, theme, onCancel, onSave } = this.props;
    const { activeTab } = this.state;

    return (
      <div
        data-hook="settings"
        className={classNames(styles.gallery_scrollContainer, {
          [styles.gallery_scrollContainer_mobile]: isMobile,
        })}
        dir={languageDir}
      >
        {isMobile && (
          <SettingsMobileHeader theme={theme} onCancel={onCancel} onSave={onSave} t={t} />
        )}
        <FocusManager focusTrapOptions={{ initialFocus: `#${activeTab}_header` }} dir={languageDir}>
          {!isMobile && (
            <SettingsPanelHeader title={t('GallerySettings_Header')} onClose={onCancel} />
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
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  updateData: PropTypes.func,
};

export default GallerySettingsModal;
