/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, FC } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../ToolbarNew.scss';
import ToolbarInputButton from '../ToolbarInputButton';
import ToolbarButton from '../ToolbarButton';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { elementOverflowWithEditor } from 'wix-rich-content-editor-common';

type dropDownPropsType = {
  isMobile?: boolean;
  tabIndex?: number;
  buttons: any;
  tooltip: string;
  dataHook: string;
  isActive: () => boolean;
  isDisabled: () => boolean;
  getLabel?: () => string;
  arrow?: boolean;
  getIcon: () => any;
  saveState?: () => void;
  saveSelection?: () => void;
  onCancel?: () => void;
  onChange?: (any) => void;
  onDelete?: () => void;
  loadSelection?: () => void;
  isInput: boolean;
};

interface ModalButtonProps {
  onToolbarButtonClick?: any;
  theme?: RichContentTheme;
  setKeepOpen?: (boolean) => void;
  t: TranslationFunction;
  modal: (() => JSX.Element) | FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSelect: (string) => void;
  onSave?: (any) => void;
  onDone?: (any) => void;
  isMobile?: boolean;
  dropDownProps: dropDownPropsType;
}

interface State {
  isModalOpen: boolean;
  isModalOverflowByHeight: boolean;
  overflowWidthBy: boolean | number;
}

class ModalButton extends Component<ModalButtonProps, State> {
  modalRef?: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isModalOverflowByHeight: false,
      overflowWidthBy: false,
    };
  }

  setModalRef = ref => (this.modalRef = ref);

  toggleModal = () => {
    const { isModalOpen } = this.state;
    const {
      dropDownProps: { saveState, saveSelection },
      setKeepOpen,
      isMobile,
    } = this.props;
    this.setState({ isModalOpen: !isModalOpen }, () => {
      if (this.state.isModalOpen && this.modalRef) {
        const modalOverflowWithEditor = elementOverflowWithEditor(this.modalRef);
        const isModalWidthOverflow = !!modalOverflowWithEditor.overflowRight;
        const isModalOverflowByHeight = !!modalOverflowWithEditor.overflowBottom;
        const overflowWidthBy = isModalWidthOverflow
          ? modalOverflowWithEditor.overflowRight
          : false;
        this.setState({
          isModalOverflowByHeight,
          overflowWidthBy,
        });
        isMobile && this.modalRef?.focus();
      } else {
        this.setState({ isModalOverflowByHeight: false, overflowWidthBy: false });
      }
    });
    if (!isModalOpen) {
      saveSelection?.();
      saveState?.();
      setKeepOpen?.(true);
    } else {
      const {
        dropDownProps: { loadSelection },
      } = this.props;
      setKeepOpen?.(false);
      loadSelection?.();
    }
  };

  closeModal = () => {
    if (this.state.isModalOpen) {
      const { setKeepOpen } = this.props;
      this.setState({ isModalOpen: false });
      setKeepOpen?.(false);
    }
  };

  onSave = (...args: [any]) => {
    this.props.onSave?.(...args);
    const {
      dropDownProps: { isMobile },
    } = this.props;
    !isMobile && this.closeModal();
  };

  onDone = (...args: [any]) => {
    this.props.onDone?.(...args);
    this.closeModal();
  };

  onDelete = () => {
    const {
      dropDownProps: { onDelete },
    } = this.props;
    onDelete?.();
    this.closeModal();
  };

  onCancel = () => {
    const {
      dropDownProps: { onCancel },
    } = this.props;
    onCancel?.();
    this.closeModal();
  };

  onChange = (...args: [any]) => {
    const {
      dropDownProps: { onChange },
    } = this.props;
    onChange?.(...args);
  };

  render() {
    const { modal, dropDownProps, onSelect, theme, t, onToolbarButtonClick } = this.props;
    const {
      isActive,
      tooltip,
      dataHook,
      getIcon,
      isDisabled,
      tabIndex,
      isMobile,
      arrow = false,
      getLabel,
      isInput,
    } = dropDownProps;
    const { isModalOpen, isModalOverflowByHeight, overflowWidthBy } = this.state;
    const buttonProps = arrow && getLabel ? { buttonContent: getLabel() } : { icon: getIcon() };
    const toolbarButtonProps = {
      ...buttonProps,
      onToolbarButtonClick,
      isActive: isModalOpen || isActive(),
      onClick: this.toggleModal,
      tooltipText: tooltip,
      dataHook,
      tabIndex,
      isMobile,
      disabled: isDisabled(),
    };
    const Button = isInput ? (
      <ToolbarInputButton onSave={this.onSave} onChange={this.onChange} {...toolbarButtonProps} />
    ) : (
      <ToolbarButton {...toolbarButtonProps} showArrowIcon={arrow} icon={getIcon()} />
    );

    const mobileStyles = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      background: 'transparent',
    } as React.CSSProperties;
    return (
      <ClickOutside onClickOutside={this.closeModal}>
        <div className={styles.buttonWrapper}>
          {Button}
          {isModalOpen && (
            <div
              data-id="toolbar-modal-button"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              ref={this.setModalRef}
              className={classNames(
                styles.modal,
                styles.withoutPadding,
                isModalOverflowByHeight && styles.modalOverflow
              )}
              onMouseDown={event => event.preventDefault()}
              style={
                isMobile ? mobileStyles : overflowWidthBy ? { left: `-${overflowWidthBy}px` } : {}
              }
              onClick={isMobile ? this.closeModal : undefined}
            >
              {modal({
                closeCustomModal: this.closeModal,
                onSelect,
                t,
                onSave: this.onSave,
                theme,
                isMobile,
                onCancel: this.onCancel,
                onChange: this.onChange,
                onDone: this.onDone,
                isActive: isActive(),
                onDelete: this.onDelete,
                onToolbarButtonClick: this.props.onToolbarButtonClick,
              })}
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default ModalButton;
