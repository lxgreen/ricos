import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from 'wix-rich-content-plugin-commons';
import { SettingsSection, SliderWithInput } from 'wix-rich-content-ui-components';
import { mergeStyles } from 'wix-rich-content-common';
import ColorToggleComponent from './color-toggle-component';
import { COLOR_PICKER_TYPE } from '../constants';
import { DEFAULT_PALETTE } from '../defaults';
import dcStyle from '../../statics/styles/design-component-styles.scss';

class DesignComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles: dcStyle, theme: props.theme });
    this.state = { ...this.withColorOptions(), pickerType: '' };
  }

  getUserColors = () => {
    const {
      settings: { themeData },
      config,
    } = this.props;
    const { colors: { actionColor, bgColor, textColor } = {} } =
      themeData || config?.themeData || {};
    return { actionColor, bgColor, textColor };
  };

  withColorOptions = () => {
    const { design = {}, settings } = this.props;
    const { color, borderColor, background } = design;
    const { getTextColors, getBorderColors, getBackgroundColors } = settings;
    const customColors = Object.values(this.getUserColors()).filter(c => !!c);
    const hasCustomColors = customColors.length > 0;

    const customBackgroundColors =
      getBackgroundColors?.() || (hasCustomColors && customColors) || DEFAULT_PALETTE;

    const customTextColors =
      getTextColors?.() || (hasCustomColors && customColors) || DEFAULT_PALETTE;

    const customBorderColors =
      getBorderColors?.() || (hasCustomColors && customColors) || DEFAULT_PALETTE;

    if (color && !customTextColors.includes(color)) {
      customTextColors.push(color);
    }
    if (borderColor && !customBorderColors.includes(borderColor)) {
      customBorderColors.push(borderColor);
    }
    if (background && !customBackgroundColors.includes(background)) {
      customBackgroundColors.push(background);
    }
    return {
      customBackgroundColors,
      customTextColors,
      customBorderColors,
    };
  };

  onBackgroundColorAdded = color => {
    const {
      settings: { getBackgroundColors, onBackgroundColorAdded },
    } = this.props;
    onBackgroundColorAdded && onBackgroundColorAdded(color);
    const customBackgroundColors = getBackgroundColors?.() || [
      ...this.state.customBackgroundColors,
      color,
    ];
    this.setState({ customBackgroundColors });
  };

  onBorderColorAdded = color => {
    const {
      settings: { getBorderColors, onBorderColorAdded },
    } = this.props;
    onBorderColorAdded && onBorderColorAdded(color);
    const customBorderColors = getBorderColors?.() || [...this.state.customBorderColors, color];
    this.setState({ customBorderColors });
  };

  onTextColorAdded = color => {
    const {
      settings: { getTextColors, onTextColorAdded },
    } = this.props;
    onTextColorAdded && onTextColorAdded(color);
    const customTextColors = getTextColors?.() || [...this.state.customTextColors, color];
    this.setState({ customTextColors });
  };

  onBorderWidthChange = value =>
    this.props.onDesignChange({
      ...this.props.design,
      borderWidth: value,
      padding: 12 - value / 2,
    });

  onBorderRadiusChange = borderRadius =>
    this.props.onDesignChange({ ...this.props.design, borderRadius });

  onTextColorChange = color => this.props.onDesignChange({ ...this.props.design, color });

  onBorderColorChange = borderColor =>
    this.props.onDesignChange({ ...this.props.design, borderColor });

  onBackgroundColorChange = background =>
    this.props.onDesignChange({ ...this.props.design, background });

  onToggled = pickerType => {
    this.setState({ pickerType: pickerType !== this.state.pickerType ? pickerType : '' });
  };

  renderColorPicker(color, userColors, onColorAdded, onChange, pickerType, label) {
    const { t, isMobile, theme, palette } = this.props;
    const paletteColors =
      (isMobile ? palette?.slice(0, 5) : palette?.slice(0, 7)) || DEFAULT_PALETTE;

    return (
      <div>
        <ColorToggleComponent
          theme={theme}
          color={color}
          pickerType={pickerType}
          isMobile={isMobile}
          isToggle={this.state.pickerType === pickerType}
          toggle={this.onToggled.bind(this)}
        >
          {label}
        </ColorToggleComponent>
        {this.state.pickerType === pickerType && (
          <ColorPicker
            color={color}
            palette={paletteColors}
            userColors={userColors.slice(0, 100)}
            onColorAdded={onColorAdded}
            theme={this.styles}
            isMobile={isMobile}
            onChange={onChange.bind(this)}
            t={t}
          >
            {({ renderUserColors, renderAddColorButton }) => (
              <div className={dcStyle.colorPicker_palette}>
                <div className={dcStyle.colorPicker_buttons_container}>
                  <div>{renderUserColors()}</div>
                  <div>{renderAddColorButton()}</div>
                </div>
              </div>
            )}
          </ColorPicker>
        )}
      </div>
    );
  }

  getColorsForPickers = () => {
    const {
      design,
      settings: { colors },
    } = this.props;
    const { actionColor, bgColor } = this.getUserColors();
    const color = design?.color || colors?.color1 || bgColor;
    const borderColor = design?.borderColor || colors?.color8 || actionColor;
    const background = design?.background || colors?.color8 || actionColor;
    return { color, borderColor, background };
  };

  render() {
    const styles = this.styles;
    const { theme, t, design } = this.props;
    const { color, borderColor, background } = this.getColorsForPickers();
    return (
      <div className={styles.button_designComponent_design_component}>
        <SettingsSection
          theme={theme}
          ariaProps={{ 'aria-label': 'border selection', role: 'region' }}
        >
          <div className={styles.button_designComponent_row}>
            <div className={styles.button_designComponent_section_header_border}>
              {t('ButtonModal_Border_Section')}
            </div>
            <div className={styles.button_designComponent_input_container_width}>
              <div className={styles.button_designComponent_slider_with_input}>
                <SliderWithInput
                  defaultValue={parseInt(design.borderWidth)}
                  min={0}
                  max={15}
                  label={t('ButtonModal_Width_Input')}
                  onChange={this.onBorderWidthChange.bind(this)}
                  theme={this.styles}
                />
              </div>
            </div>
            <div className={styles.button_designComponent_input_container_corner}>
              <div className={styles.button_designComponent_slider_with_input}>
                <SliderWithInput
                  defaultValue={parseInt(design.borderRadius)}
                  min={0}
                  max={15}
                  label={t('ButtonModal_Radius_Input')}
                  onChange={this.onBorderRadiusChange.bind(this)}
                  theme={this.styles}
                />
              </div>
            </div>
          </div>
        </SettingsSection>
        <SettingsSection
          theme={theme}
          ariaProps={{ 'aria-label': 'color selection', role: 'region' }}
        >
          <div className={styles.button_designComponent_colorPicker_container}>
            <div className={styles.button_designComponent_section_header_color}>
              {t('ButtonModal_Color_Section')}
            </div>

            {this.renderColorPicker(
              color,
              this.state.customTextColors,
              this.onTextColorAdded,
              this.onTextColorChange,
              COLOR_PICKER_TYPE.TEXT_COLOR,
              t('ButtonModal_Text_Color')
            )}
            {this.renderColorPicker(
              borderColor,
              this.state.customBorderColors,
              this.onBorderColorAdded,
              this.onBorderColorChange,
              COLOR_PICKER_TYPE.BORDER_COLOR,
              t('ButtonModal_Border_Color')
            )}
            {this.renderColorPicker(
              background,
              this.state.customBackgroundColors,
              this.onBackgroundColorAdded,
              this.onBackgroundColorChange,
              COLOR_PICKER_TYPE.BACKGROUND_COLOR,
              t('ButtonModal_Background_Color')
            )}
          </div>
        </SettingsSection>
      </div>
    );
  }
}

DesignComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  design: PropTypes.object,
  settings: PropTypes.object,
  config: PropTypes.object,
  onDesignChange: PropTypes.func.isRequired,
  palette: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool,
};

export default DesignComponent;
