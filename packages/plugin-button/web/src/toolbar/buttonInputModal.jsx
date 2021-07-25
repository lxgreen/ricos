import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  SettingsPanelFooter,
  Tabs,
  Tab,
  FocusManager,
  BUTTON_SIZE,
} from 'wix-rich-content-ui-components';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import {
  mergeStyles,
  isNewTab,
  ADD_PLUGIN_LINK_BI,
  WEB_ADDRESS_CATEGORY,
} from 'wix-rich-content-common';
import DesignComponent from '../components/design-component';
import SettingsComponent from '../components/settings-component';
import Navbar from '../components/navbar';
import PreviewComponent from '../components/preview-component';
import { settingsTabValue, designTabValue } from '../constants';
import styles from '../../statics/styles/button-input-modal.scss';
import { LINK_BUTTON_TYPE } from '../types';
export default class ButtonInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { t, componentData } = props;
    this.state = { activeTab: settingsTabValue };
    this.setScrollbarRef = element => {
      this.scrollbarRef = element;
    };
    this.designTabLabel = (
      <p className={styles.button_inputModal_tabLabel}>{t('ButtonModal_Design_Tab')}</p>
    );
    this.configedColorDesign = componentData.button.design.color;
  }

  onSettingsChange = settings => this.updateButtonData({ settings });

  onDesignChange = design => this.updateButtonData({ design });

  updateButtonData = data =>
    this.props.updateData({ button: { ...this.props.componentData.button, ...data } });

  triggerLinkBi = () => {
    const {
      settings: { rel, target, url },
    } = this.props.componentData;
    this.props.helpers?.onPluginAction?.(ADD_PLUGIN_LINK_BI, {
      plugin_id: LINK_BUTTON_TYPE,
      params: {
        link: url,
        newTab: isNewTab(target),
        category: WEB_ADDRESS_CATEGORY,
        rel,
      },
    });
  };

  onConfirm = () => {
    if (!this.configedColorDesign && this.currentColorEqualToConfig()) {
      this.removeColorsFromComponentData();
    }
    this.triggerLinkBi();
    this.props.onSave();
  };

  currentColorEqualToConfig = () => {
    const {
      componentData: {
        button: { design },
      },
      settings: { colors },
    } = this.props;
    return (
      (design.color === colors?.color1 || design.color === '#FEFDFD') &&
      (design.borderColor === colors?.color8 || design.borderColor === '#0261FF') &&
      (design.background === colors?.color8 || design.background === '#0261FF')
    );
  };

  removeColorsFromDesign = () => {
    const {
      componentData: { button },
      updateData,
    } = this.props;
    const { borderWidth, padding, borderRadius, activeButton } = button.design;
    updateData({
      button: { ...button, design: { borderWidth, padding, borderRadius, activeButton } },
    });
  };

  handleKeyPress = e => {
    if (e.charCode === KEYS_CHARCODE.ENTER) {
      this.onConfirm();
    }
    if (e.charCode === KEYS_CHARCODE.ESCAPE) {
      this.onCancel();
    }
  };

  onCancel = () => {
    if (!this.configedColorDesign) {
      this.removeColorsFromDesign();
    }
    this.props.onCancel();
  };

  handleOnMouseEnterDesign = () => {
    this.setState({ isHover: true, activeTab: designTabValue });
  };

  handleOnMouseLeaveDesign = () => {
    this.setState({ isHover: false });
  };

  handleOnMouseEnterSettings = () => {
    this.setState({ activeTab: settingsTabValue });
  };

  onTabSelected = value => this.setState({ activeTab: value });

  settingsRenderer = () => {
    const { t, theme, uiSettings, componentData, settings } = this.props;
    return (
      <SettingsComponent
        t={t}
        theme={theme}
        uiSettings={uiSettings}
        onSettingsChange={this.onSettingsChange}
        settings={componentData.button.settings}
        onKeyPress={this.handleKeyPress}
        showLinkPanel={!settings.isActionButton}
      />
    );
  };

  designRenderer = () => {
    const { theme, t, componentData, settings, palette, config, isMobile } = this.props;
    return (
      <DesignComponent
        settings={settings}
        theme={theme}
        t={t}
        styles={styles}
        onDesignChange={this.onDesignChange}
        design={componentData.button.design}
        onKeyPress={this.handleKeyPress}
        palette={palette}
        config={config}
        isMobile={isMobile}
      />
    );
  };

  mobileViewRenderer = () => {
    const { theme, t } = this.props;
    return (
      <div>
        <Navbar onConfirm={this.onConfirm} onCancel={this.onCancel} theme={theme} t={t} />
        <PreviewComponent buttonObj={this.state} {...this.props} />
        <div className={styles.button_inputModal_scroll} ref={this.setScrollbarRef}>
          <div className={styles.button_inputModal_container} data-hook="ButtonInputModal">
            <div className={styles.button_inputModal_header_text}>
              {t('ButtonModal_Settings_Tab')}
            </div>
            {this.settingsRenderer()}
          </div>
          <div className={styles.button_inputModal_separator} />
          <div
            className={styles.button_inputModal_design_component_container}
            data-hook="ButtonInputModal"
          >
            <div className={styles.button_inputModal_design_header_text}>
              {t('ButtonModal_Design_Tab')}
            </div>
            {this.designRenderer()}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { t, doneLabel, cancelLabel, isMobile } = this.props;
    const { styles } = this;
    const settingTabLabel = (
      <div className={styles.button_inputModal_settingTab}>
        <div className={styles.button_inputModal_tabTitle}>
          <p className={styles.button_inputModal_tabLabel}>{t('ButtonModal_Settings_Tab')}</p>
        </div>
      </div>
    );

    return (
      <div>
        {isMobile ? (
          this.mobileViewRenderer()
        ) : (
          <div className={styles.button_inputModal_container} data-hook="ButtonInputModal">
            <div>
              <div
                role="heading"
                aria-level={2}
                aria-labelledby="button_modal_hdr"
                className={styles.button_inputModal_header}
              >
                <div className={styles.button_inputModal_header_text}>
                  {t('ButtonModal_Header')}
                </div>
              </div>
              <FocusManager>
                <div className={styles.button_inputModal_focus_manager}>
                  <Tabs
                    value={this.state.activeTab}
                    theme={this.styles}
                    onTabSelected={this.onTabSelected}
                  >
                    <Tab label={settingTabLabel} value={settingsTabValue} theme={this.styles}>
                      <div
                        role="button"
                        tabIndex="0"
                        onMouseEnter={this.handleOnMouseEnterSettings}
                      >
                        {this.settingsRenderer()}
                      </div>
                    </Tab>
                    <Tab label={this.designTabLabel} value={designTabValue} theme={this.styles}>
                      <Scrollbars
                        ref={this.setScrollbarRef}
                        renderThumbVertical={() =>
                          this.state.isHover ? (
                            <div className={styles.button_inputModal_scrollbar_thumb} />
                          ) : (
                            <div />
                          )
                        }
                        className={styles.button_inputModal_customize_scrollbar_container}
                        onMouseEnter={this.handleOnMouseEnterDesign}
                        onMouseLeave={this.handleOnMouseLeaveDesign}
                      >
                        {this.designRenderer()}
                      </Scrollbars>
                    </Tab>
                  </Tabs>
                </div>
              </FocusManager>
            </div>
            <SettingsPanelFooter
              className={styles.button_inputModal_modal_footer}
              save={this.onConfirm}
              cancel={this.onCancel}
              saveLabel={doneLabel}
              cancelLabel={cancelLabel}
              theme={styles}
              t={t}
              buttonSize={BUTTON_SIZE.small}
            />
          </div>
        )}
      </div>
    );
  }
}

ButtonInputModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
  pubsub: PropTypes.object,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  uiSettings: PropTypes.object,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
  palette: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  updateData: PropTypes.func,
};

ButtonInputModal.defaultProps = {
  doneLabel: 'Save',
  cancelLabel: 'Cancel',
};
