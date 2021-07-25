import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'wix-rich-content-ui-components';
import { LinkPanelWrapper } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-component-styles.scss';

class SettingsComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  onTextChanged = buttonText => this.props.onSettingsChange({ ...this.props.settings, buttonText });

  onLinkPanelChange = linkPanelValues =>
    this.props.onSettingsChange({ ...this.props.settings, ...linkPanelValues });

  render() {
    const { t, showLinkPanel, uiSettings, theme, settings, onKeyPress } = this.props;
    const { linkPanel } = uiSettings || {};
    const { showNewTabCheckbox, showNoFollowCheckbox, showSponsoredCheckbox } = linkPanel || {};
    const { url, target, rel } = settings || {};
    return (
      <div className={this.styles.button_settingsComponent_section_content}>
        <div className={this.styles.button_settingsComponent_name_feild}>
          <div className={this.styles.button_settingsComponent_header_ButtonText}>
            {t('ButtonModal_Button_Text')}
          </div>
          <div>
            <TextInput
              data-hook="ButtonInputModal"
              onKeyPress={onKeyPress}
              theme={this.styles}
              type="text"
              onChange={this.onTextChanged}
              value={settings.buttonText}
              placeholder={t('ButtonModal_InputName_Placeholder')}
            />
          </div>
        </div>
        {showLinkPanel && (
          <>
            <div className={this.styles.button_settingsComponent_header_ButtonLink}>
              {t('ButtonModal_Button_Link')}
            </div>
            <LinkPanelWrapper
              linkValues={showLinkPanel ? { url, target, rel } : {}}
              onChange={this.onLinkPanelChange}
              showNewTabCheckbox={showNewTabCheckbox}
              showNoFollowCheckbox={showNoFollowCheckbox}
              showSponsoredCheckbox={showSponsoredCheckbox}
              theme={theme}
              t={t}
            />
          </>
        )}
      </div>
    );
  }
}

SettingsComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  onSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  onKeyPress: PropTypes.func,
  showLinkPanel: PropTypes.bool,
  uiSettings: PropTypes.object,
};

export default SettingsComponent;
