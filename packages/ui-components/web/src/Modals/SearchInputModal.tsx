/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RichContentTheme } from 'wix-rich-content-common';
import { TextSearchInput } from '../';
import { KEYS_CHARCODE } from '../consts';
import ModalContainer from './TextInputModalContainer';
import styles from '../../statics/styles/url-input-modal.scss';

const SearchInputModal = props => {
  interface ModalProps {
    theme?: RichContentTheme;
    dataHook: string;
    onConfirm: () => void;
    onCloseRequested: (() => void) | undefined;
    submittedInvalidUrl?: any;
    errorMessage: string;
    placeholder: string;
    onInputChange: (text) => void;
    input?: string;
    children?: React.ReactNode;
  }

  const {
    dataHook,
    children,
    onCloseRequested,
    placeholder,
    onInputChange,
    input,
  }: ModalProps = props;

  const onTextChange = url => {
    onInputChange(url);
  };

  const handleKeyPress = event => {
    if (event.charCode === KEYS_CHARCODE.ESCAPE) {
      onCloseRequested?.();
    }
  };

  return (
    <ModalContainer {...props}>
      <div className={styles.textSearchInput_container}>
        <TextSearchInput
          id="dropdown-text-input"
          onClose={onCloseRequested}
          onKeyPress={handleKeyPress}
          onChange={onTextChange}
          value={input}
          placeHolder={placeholder}
          theme={props.theme}
          data-hook={`${dataHook}Input`}
          autoComplete="off"
        />
        {children}
      </div>
    </ModalContainer>
  );
};

export default SearchInputModal;
