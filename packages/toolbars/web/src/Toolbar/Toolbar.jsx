import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Toolbar.scss';
import { TOOLBAR_BUTTON_TYPES } from './consts';
import GroupButton from './ButtonComponents/GroupButton';
import DropdownButton from './ButtonComponents/DropdownButton';
import ModalButton from './ButtonComponents/ModalButton';
import ColorPickerButton from './ButtonComponents/ColorPickerButton';
import NestedMenu from './ButtonComponents/NestedMenu';
import ToolbarButton from './ToolbarButton';
import ContextMenu from './ButtonComponents/ContextMenu';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    const buttonTheme = props.theme?.buttonStyles || {};
    const buttonStyles = {
      inlineToolbarButton_wrapper: buttonTheme.textToolbarButton_wrapper,
      inlineToolbarButton: buttonTheme.textToolbarButton,
      inlineToolbarButton_icon: buttonTheme.textToolbarButton_icon,
    };
    this.theme = { ...props.theme, buttonStyles };
  }

  onMouseDown = event => {
    event.preventDefault();
  };

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    return (
      <ToolbarButton
        onClick={onClick}
        isActive={isActive()}
        theme={this.theme}
        dataHook={dataHook}
        isMobile={this.props.isMobile}
        tooltipText={tooltip}
        icon={getIcon()}
        disabled={isDisabled()}
      />
    );
  };

  renderSeparator = () => <div className={styles.separator} />;

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick(this.buttonRef);
    }
  };

  renderDropDown = buttonProps => {
    const { isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme: this.theme,
      ...buttonProps,
    };
    return <DropdownButton {...dropDownProps} />;
  };

  renderButtonGroup = ({ buttonList, ...rest }) => {
    const { isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme: this.theme,
      ...rest,
    };
    return <GroupButton buttons={Object.values(buttonList)} {...dropDownProps} />;
  };

  renderColorPicker = buttonProps => {
    const { t, isMobile, afterClick, nestedMenu } = this.props;
    const {
      getCurrentColor,
      onColorAdded,
      onChange,
      settings,
      defaultPalette,
      getUserColors,
      getDefaultColors,
      onResetColor,
      ...rest
    } = buttonProps;
    return (
      <ColorPickerButton
        getCurrentColor={getCurrentColor}
        onColorAdded={onColorAdded}
        onChange={onChange}
        settings={settings}
        t={t}
        isMobile={isMobile}
        nestedMenu={nestedMenu}
        afterClick={afterClick}
        defaultPalette={defaultPalette}
        getUserColors={getUserColors}
        getDefaultColors={getDefaultColors}
        dropDownProps={rest}
        theme={this.theme}
        onResetColor={onResetColor}
      />
    );
  };

  renderTextButton = buttonProps => {
    const { onClick, dataHook, text, tooltip, isDisabled } = buttonProps;
    return (
      <ToolbarButton
        onClick={onClick}
        theme={this.theme}
        dataHook={dataHook}
        isMobile={this.props.isMobile}
        buttonContent={text}
        tooltipText={tooltip}
        disabled={isDisabled?.()}
      />
    );
  };

  renderModal = buttonProps => {
    const { isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme: this.theme,
      ...buttonProps,
    };
    return (
      <ModalButton
        modal={buttonProps.modal}
        onSelect={buttonProps.onSelect}
        dropDownProps={dropDownProps}
      />
    );
  };

  renderComponent = buttonProps => {
    const { Component } = buttonProps;
    return <Component />;
  };

  renderNestedMenu = buttonProps => {
    const { isMobile, tabIndex, t } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      t,
      theme: this.theme,
      ...buttonProps,
    };
    return <NestedMenu dropDownProps={dropDownProps} />;
  };

  renderContextMenu = buttonProps => {
    const { isMobile, tabIndex, t } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      t,
      theme: this.theme,
      ...buttonProps,
    };
    return <ContextMenu {...dropDownProps} />;
  };

  buttonMap = {
    [TOOLBAR_BUTTON_TYPES.BUTTON]: this.renderButton,
    [TOOLBAR_BUTTON_TYPES.TOGGLE]: this.renderButton,
    [TOOLBAR_BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
    [TOOLBAR_BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
    [TOOLBAR_BUTTON_TYPES.GROUP]: this.renderButtonGroup,
    [TOOLBAR_BUTTON_TYPES.TEXT]: this.renderTextButton,
    [TOOLBAR_BUTTON_TYPES.COLOR_PICKER]: this.renderColorPicker,
    [TOOLBAR_BUTTON_TYPES.MODAL]: this.renderModal,
    [TOOLBAR_BUTTON_TYPES.COMPONENT]: this.renderComponent,
    [TOOLBAR_BUTTON_TYPES.CONTEXT_MENU]: this.renderContextMenu,
    [TOOLBAR_BUTTON_TYPES.NESTED_MENU]: this.renderNestedMenu,
  };

  separateByGaps = buttons => {
    const separatedButtons = [[]];
    buttons.forEach(button => {
      if (button.type !== TOOLBAR_BUTTON_TYPES.GAP) {
        separatedButtons[separatedButtons.length - 1].push(button);
      } else {
        separatedButtons.push([]);
      }
    });
    return separatedButtons;
  };

  cleanUnwantedSeparators = buttons => {
    const cleanedButtons = [];
    buttons.forEach((button, index) => {
      if (
        (cleanedButtons.length !== 0 || button.type !== 'SEPARATOR') &&
        !(button.type === 'SEPARATOR' && buttons[index - 1].type === 'SEPARATOR')
      ) {
        cleanedButtons.push(button);
      }
    });
    // eslint-disable-next-line fp/no-loops
    while (cleanedButtons[cleanedButtons.length - 1].type === 'SEPARATOR') {
      cleanedButtons.pop();
    }
    return cleanedButtons;
  };

  render() {
    const { buttons, vertical } = this.props;
    const buttonsSeparatedByGaps = this.separateByGaps(buttons);
    return buttonsSeparatedByGaps.map((buttonsWithoutGaps, index) => {
      const buttonsWithoutUnwantedSeparators = this.cleanUnwantedSeparators(buttonsWithoutGaps);
      return (
        <div key={index} className={classNames(styles.toolbar, { [styles.vertical]: vertical })}>
          {buttonsWithoutUnwantedSeparators.map((buttonProps, i) => {
            const Button = this.buttonMap[buttonProps.type];
            return <Button {...buttonProps} key={i} />;
          })}
        </div>
      );
    });
  }
}

Toolbar.propTypes = {
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  buttons: PropTypes.array,
  nestedMenu: PropTypes.bool,
  vertical: PropTypes.bool,
  afterClick: PropTypes.func,
};

export default Toolbar;
