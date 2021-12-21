import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import ReactModal from 'react-modal';

import {
  Tabs,
  Tab,
  SettingsPanelFooter,
  FocusManager,
  SettingsMobileHeader,
  Button,
} from 'wix-rich-content-ui-components';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';

import { PollContextProvider } from '../poll-context';
import { RCEHelpersContext } from '../rce-helpers-context';

import { TABS } from './constants';

import { DesignSettingsSection } from './design-settings-section';
import { LayoutSettingsSection } from './layout-settings-section';
import { PollSettingsSection } from './poll-settings-section';
import { EditPollSection } from './edit-poll-section';
import { PollViewer } from '../../PollViewer';

import styles from './poll-settings-modal.scss';

export class SettingsModal extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    componentData: PropTypes.object.isRequired,
    helpers: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func,
    settings: PropTypes.object.isRequired,
    updateData: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    activeTab: TABS.LAYOUT,
  };

  state = {
    activeTab: this.props.activeTab,
    $container: React.createRef(),
    isPreviewOpen: false,
  };

  styles = mergeStyles({ styles, theme: this.props.theme });

  static contextType = GlobalContext;

  setPoll = poll => {
    const { updateData } = this.props;
    updateData({ poll });
  };

  handleTabChange = activeTab => this.setState({ activeTab });

  getContainer = () => this.state.$container.current;

  closePreview = () => this.setState({ isPreviewOpen: false });

  openPreview = () => this.setState({ isPreviewOpen: true });

  onComponentUpdate = () => this.forceUpdate();

  render() {
    const { activeTab, $container, isPreviewOpen } = this.state;
    const {
      helpers,
      updateData,
      onCancel,
      onSave,
      t,
      theme,
      isMobile,
      settings,
      componentData,
    } = this.props;
    const { languageDir } = this.context;

    return (
      <div ref={$container}>
        <FocusManager dir={languageDir}>
          {isMobile ? (
            <SettingsMobileHeader onSave={onSave} onCancel={onCancel} theme={styles} t={t}>
              <div className={this.styles.preview_button}>
                <Button borderless isMobile onClick={this.openPreview}>
                  {t('Poll_FormatToolbar_Preview_Tooltip')}
                </Button>
              </div>
            </SettingsMobileHeader>
          ) : (
            <div className={this.styles.header}>
              <h3 className={this.styles.title}>{t('Poll_PollSettings_Common_Header')}</h3>
            </div>
          )}

          {activeTab === TABS.EDIT ? (
            <RCEHelpersContext.Provider
              value={{
                layout: componentData.layout,
                design: componentData.design,
                helpers,
                theme,
                t,
                isMobile,
              }}
            >
              <PollContextProvider
                settings={settings}
                poll={componentData.poll}
                setPoll={this.setPoll}
                t={t}
              >
                <EditPollSection updateData={updateData} />
              </PollContextProvider>
            </RCEHelpersContext.Provider>
          ) : (
            <Tabs value={activeTab} theme={theme} onTabSelected={this.handleTabChange}>
              <Tab
                label={t('Poll_PollSettings_Tab_Layout_TabName')}
                value={TABS.LAYOUT}
                theme={theme}
              >
                <LayoutSettingsSection
                  theme={theme}
                  updateData={updateData}
                  componentData={componentData}
                  t={t}
                  isMobile={isMobile}
                />
              </Tab>
              <Tab
                label={t('Poll_PollSettings_Tab_Design_TabName')}
                value={TABS.DESIGN}
                theme={theme}
              >
                <DesignSettingsSection
                  theme={theme}
                  updateData={updateData}
                  componentData={componentData}
                  t={t}
                  languageDir={languageDir}
                />
              </Tab>
              <Tab
                label={t('Poll_PollSettings_Tab_Settings_TabName')}
                value={TABS.SETTINGS}
                theme={theme}
              >
                <PollSettingsSection
                  theme={theme}
                  updateData={updateData}
                  componentData={componentData}
                  t={t}
                  settings={settings}
                />
              </Tab>
            </Tabs>
          )}

          {!isMobile && (
            <SettingsPanelFooter
              fixed
              cancel={onCancel}
              save={onSave}
              theme={this.props.theme}
              t={t}
            />
          )}

          {isMobile && $container.current && (
            <ReactModal
              isOpen={isPreviewOpen}
              onRequestClose={this.closePreview}
              parentSelector={this.getContainer}
              className={cls(this.styles.modal)}
              overlayClassName={cls(this.styles.overlay)}
            >
              <PollViewer
                isMobile
                settings={{
                  isPreview: true,
                  preventInteraction: true,
                }}
                componentData={componentData}
                onRequestClose={this.closePreview}
                theme={theme}
                t={t}
              />
              &nbsp;
              <button
                className={cls(
                  this.styles.poll_header_button,
                  this.styles.poll_header_button_primary
                )}
                onClick={this.closePreview}
              >
                {t('Poll_Preview_Close_CTA')}
              </button>
            </ReactModal>
          )}
        </FocusManager>
      </div>
    );
  }
}
