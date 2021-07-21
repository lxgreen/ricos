import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, getImageSrc, RICOS_IMAGE_TYPE } from 'wix-rich-content-common';
import {
  SettingsPanelFooter,
  SettingsSection,
  LabeledToggle,
  InputWithLabel,
  Image,
  Loader,
} from 'wix-rich-content-ui-components';
import ImageSettingsMobileHeader from './image-settings-mobile-header';
import styles from '../../statics/styles/image-settings.scss';
import { DIVIDER } from '../consts';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
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

  renderToggle = ({ isChecked, labelKey, dataHook, tooltipText, onToggle, type }) => {
    return type === DIVIDER ? (
      <div className={this.styles.divider} />
    ) : (
      <div key={labelKey} className={this.styles.imageSettings_toggleContainer}>
        <LabeledToggle
          theme={this.props.theme}
          checked={isChecked()}
          label={this.props.t(labelKey)}
          onChange={() => onToggle(!isChecked())}
          dataHook={dataHook}
          tooltipText={tooltipText}
        />
      </div>
    );
  };

  baseToggleData = [
    {
      isChecked: () => !this.props.componentData.disableExpand,
      labelKey: 'ImagePlugin_Settings_ImageOpensInExpandMode_Label',
      dataHook: 'imageExpandToggle',
      tooltipText: this.props.t('ImageSettings_Expand_Mode_Toggle'),
      onToggle: value => this.props.updateData({ disableExpand: !value }),
    },
    {
      isChecked: () => !this.props.componentData.disableDownload,
      labelKey: 'ImagePlugin_Settings_ImageCanBeDownloaded_Label',
      dataHook: 'imageDownloadToggle',
      tooltipText: this.props.t('ImagePlugin_Settings_ImageCanBeDownloaded_Tooltip'),
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
          labelKey: 'ImageSettings_Spoiler_Toggle',
          dataHook: 'imageSpoilerToggle',
          tooltipText: this.props.t('Spoiler_Toggle_Tooltip'),
          onToggle: value => this.props.updateData(this.getSpoilerConfig(value)),
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
      componentData,
    } = this.props;
    const { src, error, metadata = {} } = componentData;
    return (
      <div className={this.styles.imageSettings} data-hook="settings" dir={languageDir}>
        {isMobile ? (
          <ImageSettingsMobileHeader
            t={t}
            theme={theme}
            cancel={onCancel}
            save={onSave}
            saveName={this.updateLabel}
          />
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
  editorCommands: PropTypes.any,
  updateData: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default ImageSettings;
