/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, FC } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../ToolbarNew.scss';
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
  isMobileModalFullscreen?: boolean;
  getIcon: () => any;
  saveState?: () => void;
  saveSelection?: () => void;
  onCancel?: () => void;
  onChange?: (any) => void;
  onDelete?: () => void;
  loadSelection?: () => void;
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
    if (!isModalOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
  };

  handleOverflow = () => {
    const { isMobile } = this.props;
    const rootEditorElement = this.modalRef
      ?.closest('[data-hook=ricos-editor-toolbars]')
      ?.parentElement?.querySelector('[data-hook=root-editor]') as HTMLElement;
    if (this.modalRef && rootEditorElement) {
      const modalOverflowWithEditor = elementOverflowWithEditor(this.modalRef, rootEditorElement);
      const isModalWidthOverflow = !!modalOverflowWithEditor.overflowRight;
      const isModalOverflowByHeight = !!modalOverflowWithEditor.overflowBottom;
      const overflowWidthBy = isModalWidthOverflow ? modalOverflowWithEditor.overflowRight : false;
      this.setState({
        isModalOverflowByHeight,
        overflowWidthBy,
      });
      isMobile && this.modalRef?.focus();
    } else {
      this.setState({ isModalOverflowByHeight: false, overflowWidthBy: false });
    }
  };

  openModal = () => {
    if (!this.state.isModalOpen) {
      const {
        dropDownProps: { saveState, saveSelection },
        setKeepOpen,
      } = this.props;
      this.setState({ isModalOpen: true }, this.handleOverflow);
      saveSelection?.();
      saveState?.();
      setKeepOpen?.(true);
    }
  };

  closeModal = (loadSelectionOnClose = true) => {
    if (this.state.isModalOpen) {
      const {
        setKeepOpen,
        dropDownProps: { loadSelection },
      } = this.props;
      this.setState({ isModalOpen: false });
      setKeepOpen?.(false);
      loadSelectionOnClose && loadSelection?.();
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

  onClickOutside = e => {
    this.closeModal(e.target.closest('[data-hook=ricos-editor-toolbars]'));
  };

  render() {
    const { modal, dropDownProps, onSelect, theme, t } = this.props;
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
      isMobileModalFullscreen = false,
    } = dropDownProps;
    const { isModalOpen, isModalOverflowByHeight, overflowWidthBy } = this.state;
    const buttonProps = arrow && getLabel ? { buttonContent: getLabel() } : { icon: getIcon() };
    const onModalWrapperClick =
      isMobile && !isMobileModalFullscreen ? () => this.closeModal() : undefined;
    const defaultStyles = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
    } as React.CSSProperties;
    const mobileStyles = isMobileModalFullscreen
      ? { ...defaultStyles, height: '100%' }
      : { ...defaultStyles, background: 'transparent' };

    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <div className={styles.buttonWrapper}>
          <ToolbarButton
            onToolbarButtonClick={this.props.onToolbarButtonClick}
            isActive={isModalOpen || isActive()}
            onClick={this.toggleModal}
            showArrowIcon={arrow}
            tooltipText={tooltip}
            dataHook={dataHook}
            tabIndex={tabIndex}
            isMobile={isMobile}
            disabled={isDisabled()}
            icon={getIcon()}
            theme={theme}
            {...buttonProps}
          />
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
              style={
                isMobile ? mobileStyles : overflowWidthBy ? { left: `-${overflowWidthBy}px` } : {}
              }
              onClick={onModalWrapperClick}
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
