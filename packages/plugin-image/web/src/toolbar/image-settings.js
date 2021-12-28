import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { getImageSrc } from 'wix-rich-content-common/libs/imageUtils';
import {
  SettingsPanelFooter,
  SettingsSection,
  LabeledToggle,
  InputWithLabel,
  Image,
  Loader,
  SettingsMobileHeader,
  SettingsSeparator,
} from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/image-settings.scss';
import { DIVIDER } from '../consts';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
    const { t, theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.updateLabel = t('ImageSettings_Update');
    this.headerText = t('ImageSettings_Header');
    this.captionLabel = t('ImageSettings_Caption_Label');
    this.captionInputPlaceholder = t('ImageSettings_Caption_Input_Placeholder');
    this.altLabel = t('ImageSettings_Alt_Label');
    this.altTooltip = 'ImageSettings_Alt_Label_Tooltip';
    this.altInputPlaceholder = t('ImageSettings_Alt_Input_Placeholder');
  }

  propsToState(props) {
    const { componentData } = props;
    const { src, error } = componentData;

    return { src, error };
  }

  renderToggle = ({ isChecked, labelKey, dataHook, tooltipText, onChange, type }) => {
    return type === DIVIDER ? (
      <SettingsSeparator top />
    ) : (
      <div key={labelKey} className={this.styles.imageSettings_toggleContainer}>
        <LabeledToggle
          theme={this.props.theme}
          checked={isChecked()}
          label={this.props.t(labelKey)}
          onChange={onChange}
          dataHook={dataHook}
          tooltipText={tooltipText}
        />
      </div>
    );
  };

  baseToggleData = [
    {
      labelKey: 'ImagePlugin_Settings_ImageOpensInExpandMode_Label',
      dataHook: 'imageExpandToggle',
      tooltipText: this.props.t('ImageSettings_Expand_Mode_Toggle'),
      isChecked: () => !this.props.componentData.disableExpand,
      onChange: () =>
        this.props.updateData({ disableExpand: !this.props.componentData.disableExpand }),
    },
    {
      labelKey: 'ImagePlugin_Settings_ImageCanBeDownloaded_Label',
      dataHook: 'imageDownloadToggle',
      tooltipText: this.props.t('ImagePlugin_Settings_ImageCanBeDownloaded_Tooltip'),
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
          labelKey: 'ImageSettings_Spoiler_Toggle',
          dataHook: 'imageSpoilerToggle',
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

  metadataUpdated = (metadata, value) => {
    this.props.updateData({ metadata: { ...metadata, ...value } });
  };

  getSpoilerConfig = enabled => ({
    config: {
      ...this.props.componentData.config,
      spoiler: { enabled },
    },
  });

  render() {
    const {
      helpers,
      theme,
      t,
      isMobile,
      languageDir,
      onCancel,
      onSave,
      componentData: { metadata = {} },
    } = this.props;
    const { src, error } = this.state;
    return (
      <div className={this.styles.imageSettings} data-hook="settings" dir={languageDir}>
        {isMobile ? (
          <SettingsMobileHeader theme={theme} onCancel={onCancel} onSave={onSave} t={t} />
        ) : (
          <h3 className={this.styles.imageSettingsTitle}>{this.headerText}</h3>
        )}
        <div
          className={classNames(styles.imageSettings_scrollContainer, {
            [styles.imageSettings_mobile]: isMobile,
          })}
        >
          <SettingsSection
            theme={theme}
            className={this.styles.imageSettingsImageSection}
            ariaProps={{
              'aria-label': 'image preview',
              role: 'region',
              'data-hook': 'imagePreview',
            }}
          >
            {src ? (
              <Image
                alt={metadata.alt || 'image preview'}
                resizeMode={'contain'}
                className={this.styles.imageSettingsImage}
                src={getImageSrc(src, helpers?.getImageUrl, {
                  requiredWidth: 1000,
                  requiredHeight: 250,
                  requiredQuality: 80,
                })}
                theme={theme}
                error={error}
                t={t}
              />
            ) : (
              <div className={this.styles.imageSettingsImage}>
                <Loader type={'medium'} />
              </div>
            )}
          </SettingsSection>
          <div className={this.styles.imageSettings_inputsWrapper}>
            <SettingsSection
              theme={theme}
              className={this.styles.imageSettingsSection}
              ariaProps={{ 'aria-label': 'image caption', role: 'region' }}
            >
              <InputWithLabel
                theme={theme}
                id="imageSettingsCaptionInput"
                label={this.captionLabel}
                placeholder={this.captionInputPlaceholder}
                value={metadata.caption || ''}
                onChange={caption => this.metadataUpdated(metadata, { caption })}
                dataHook="imageSettingsCaptionInput"
              />
            </SettingsSection>
            <SettingsSection
              theme={theme}
              className={this.styles.imageSettingsSection}
              ariaProps={{ 'aria-label': 'image alt text', role: 'region' }}
            >
              <InputWithLabel
                theme={theme}
                id="imageSettingsAltInput"
                label={this.altLabel}
                placeholder={this.altInputPlaceholder}
                t={t}
                value={metadata.alt || ''}
                onChange={alt => this.metadataUpdated(metadata, { alt })}
                dataHook="imageSettingsAltInput"
                tooltipTextKey={this.altTooltip}
                isMobile={isMobile}
              />
            </SettingsSection>
            <SettingsSection
              theme={theme}
              ariaProps={{ 'aria-label': 'link redirect explanation', role: 'region' }}
            >
              <div className={this.styles.imageSettingsLabel}>
                {this.toggleData.map(toggle => this.renderToggle(toggle))}
              </div>
            </SettingsSection>
          </div>
        </div>
        {!isMobile && (
          <SettingsPanelFooter fixed theme={theme} cancel={onCancel} save={onSave} t={t} />
        )}
      </div>
    );
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  shouldShowSpoiler: PropTypes.bool,
  updateData: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ImageSettings;
