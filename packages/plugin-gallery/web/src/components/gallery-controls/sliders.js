import React from 'react';
import PropTypes from 'prop-types';
import { SliderWithInput } from 'wix-rich-content-ui-components';

const propTypes = {
  value: PropTypes.number,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  t: PropTypes.func,
  languageDir: PropTypes.string.isRequired,
};

export const ItemsPerRow = props => {
  const { t, languageDir } = props;
  const itemsPerRowLabel = t('GallerySettings_Sliders_Items_Per_Row');
  return (
    <SliderWithInput
      min={1}
      max={5}
      label={itemsPerRowLabel}
      sliderDataHook="itemsPerRowSlider"
      inputDataHook="itemsPerRowInput"
      languageDir={languageDir}
      {...props}
    />
  );
};
ItemsPerRow.propTypes = propTypes;
ItemsPerRow.defaultProps = {
  defaultValue: 3,
};

export const Spacing = props => {
  const { t, languageDir } = props;
  const spacingLabel = t('GallerySettings_Spacing_Between_Items');
  return (
    <SliderWithInput
      label={spacingLabel}
      sliderDataHook="spacingSlider"
      inputDataHook="spacingInput"
      tooltipTextKey={'GallerySettings_Spacing_Between_Items_Tooltip'}
      t={t}
      languageDir={languageDir}
      {...props}
    />
  );
};
Spacing.propTypes = propTypes;
Spacing.defaultProps = {
  defaultValue: 20,
};

export const ThumbnailSize = props => (
  <SliderWithInput
    min={10}
    max={1000}
    label={props.options.label}
    sliderDataHook="thumbnailSizeSlider"
    inputDataHook="thumbnailSizeInput"
    languageDir={props.languageDir}
    {...props}
  />
);
ThumbnailSize.propTypes = propTypes;
ThumbnailSize.defaultProps = {
  defaultValue: 120,
};
