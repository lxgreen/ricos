/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import DefaultColorPicker from './DefaultColorPicker';
import AddColorIcon from '../../Icons/AddColorIcon';
import styles from '../../../statics/styles/color-picker.scss';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `cpk_${Math.floor(Math.random() * 9999)}`;

    this.state = {
      color: this.props.color,
      isCustomColorPickerOpened: false,
    };

    this.toggleCustomColorPicker = this.toggleCustomColorPicker.bind(this);
    this.onCustomColorUpdate = this.onCustomColorUpdate.bind(this);
    this.onCustomColorCancel = this.onCustomColorCancel.bind(this);
    this.onCustomColorPicked = this.onCustomColorPicked.bind(this);
  }

  componentDidMount() {
    import('./CustomColorPicker'); //prefetch
  }

  componentWillReceiveProps(props) {
    if (this.props.color !== props.color) {
      this.setState({ color: props.color });
    }
  }

  onColorButtonClicked(color, e) {
    if (e.target.dataset.schemeColor) {
      this.setColor(e.target.dataset.schemeColor, e);
    } else {
      this.setColor(color, e);
    }
  }

  setColor = (color, e) => {
    this.setState({ color });
    this.props.onChange({ color, event: e });
  };

  onCustomColorPicked = color => {
    this.props.onCustomColorPicked(color);
  };

  onCustomColorUpdate(color) {
    if (color !== this.state.color) {
      this.props.onColorAdded({ color });
    }
    this.setColor(color);
    this.toggleCustomColorPicker();
  }

  onCustomColorCancel() {
    this.toggleCustomColorPicker();
  }

  toggleCustomColorPicker() {
    this.setState(prevState => ({
      isCustomColorPickerOpened: !prevState.isCustomColorPickerOpened,
    }));
  }

  resetColor = e => {
    this.props.onResetColor({ event: e });
  };

  renderColorButtons(colors, attributes) {
    const { styles } = this;
    const { schemeColor } = this.props;
    return colors.map((color, index) => (
      <button
        data-hook="modal-option"
        data-scheme-color={attributes ? attributes[index] : ''}
        title={color}
        key={`${color}_${index}`}
        className={classNames({
          [styles.colorPicker_button]: true,
          [styles.colorPicker_button_selected]:
            this.state.color === color &&
            (!schemeColor || !attributes || attributes[index] === schemeColor),
          [styles.colorPicker_button_transparent]: color === 'transparent',
        })}
        style={color !== 'transparent' ? { background: color } : {}}
        onClick={e => this.onColorButtonClicked(color, e)}
      />
    ));
  }

  renderSeparator() {
    const { styles } = this;
    return <hr className={styles.colorPicker_separator} />;
  }

  renderAddColorButton = () => {
    const { styles } = this;
    return (
      <div
        key={`add_color_button_${this.id}`}
        className={styles.colorPicker_add_color_button}
        data-hook="addColor"
      >
        <label // eslint-disable-line
          onClick={this.toggleCustomColorPicker}
          tabIndex={-1} // eslint-disable-line
          className={styles.colorPicker_add_color_label}
          htmlFor={`add_color_button_${this.id}`}
        >
          <button
            id={`add_color_button_${this.id}`}
            className={styles.colorPicker_color_button_hidden}
            onClick={() => this.toggleCustomColorPicker}
          />
          <AddColorIcon />
        </label>
      </div>
    );
  };

  renderResetColorButton = () => {
    const { styles } = this;
    const { t } = this.props;
    return (
      <div key={`reset_color_button_${this.id}`} className={styles.colorPicker_reset_color_button}>
        <label // eslint-disable-line
          onClick={this.resetColor}
          data-hook="resetColor"
          tabIndex={-1} // eslint-disable-line
          className={styles.colorPicker_reset_color_label}
          htmlFor={`reset_color_button_${this.id}`}
        >
          {t('ColorPicker_SetToDefault_ButtonLabel')}
          <button
            id={`reset_color_button_${this.id}`}
            className={styles.colorPicker_color_button_hidden}
            onClick={this.resetColor}
          />
        </label>
      </div>
    );
  };

  renderPalette = () => this.renderColorButtons(this.props.palette, this.props.schemeAttributes);

  renderUserColors = () => this.renderColorButtons(this.props.userColors);

  render() {
    const {
      styles,
      renderPalette,
      renderUserColors,
      renderAddColorButton,
      renderResetColorButton,
    } = this;
    const { t, isMobile, theme, children } = this.props;
    return (
      <div className={classNames(styles.colorPicker, { [styles.mobile]: isMobile })} tabIndex={0}>
        {this.state.isCustomColorPickerOpened
          ? this.props.onCustomPickerToggle({
              color: this.state.color,
              onCustomColorPicked: this.onCustomColorPicked,
              onCustomColorCancel: this.onCustomColorCancel,
              onCustomColorUpdate: this.onCustomColorUpdate,
              t,
              isMobile,
              theme,
            })
          : children({
              renderPalette,
              renderUserColors,
              renderAddColorButton,
              renderResetColorButton,
              mergedStyles: styles,
            })}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  theme: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  defaultColor: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onResetColor: PropTypes.func,
  palette: PropTypes.arrayOf(PropTypes.string).isRequired,
  schemeAttributes: PropTypes.arrayOf(PropTypes.string),
  schemeColor: PropTypes.string,
  userColors: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  onColorAdded: PropTypes.func.isRequired,
  onCustomPickerToggle: PropTypes.func,
  onCustomColorPicked: PropTypes.func,
  isMobile: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  onCustomPickerToggle: props => <DefaultColorPicker {...props} />,
  onCustomColorPicked: () => {},
};

export default ColorPicker;
