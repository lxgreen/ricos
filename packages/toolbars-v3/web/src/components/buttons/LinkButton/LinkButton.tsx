/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { ClickOutside } from 'wix-rich-content-editor-common';
import cx from 'classnames';
import styles from './LinkButton.scss';
import { withToolbarContext } from '../../../utils/withContext';
import LinkModal from '../../../modals/link/LinkComponents/LinkModal';
import { getLangDir, CUSTOM_LINK } from 'wix-rich-content-common';
import { getLinkModalProps } from './utils';

const onDone = (data, toolbarItem, setModalOpen) => {
  toolbarItem.commands?.insertLink(data);
  setModalOpen(false);
};

const onDelete = (toolbarItem, setModalOpen) => {
  toolbarItem.commands?.removeLink();
  setModalOpen(false);
};

const LinkButton = ({ toolbarItem, context }) => {
  const { isMobile, t, theme, getEditorCommands, linkPanelData = {}, locale } = context || {};
  const [isModalOpen, setModalOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const onClickOutside = e => {
    const modalRef = popperElement;
    if (!modalRef || modalRef.contains(e.target as Node)) {
      return;
    }
    setModalOpen(false);
  };

  const editorCommands = getEditorCommands?.();
  const { onLinkAdd, linkSettings = {}, ...rest } = linkPanelData;
  const { linkData, anchorableBlocks, linkSettingsData } = getLinkModalProps(
    editorCommands,
    linkSettings
  );

  const openCloseModal = () => {
    const isCustomLinkHandling = !!onLinkAdd;
    if (isCustomLinkHandling) {
      const customLinkData = linkData?.customData;
      const callback = data => editorCommands.insertDecoration(CUSTOM_LINK, data);
      onLinkAdd(customLinkData, callback);
    } else {
      setModalOpen(!isModalOpen);
    }
  };

  const Icon = toolbarItem.presentation?.icon;
  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div
        className={cx(
          styles.linkModalButtonWrapper,
          isModalOpen || toolbarItem.attributes.active ? styles.active : '',
          { [styles.mobileLinkModalButtonWrapper]: isMobile }
        )}
        ref={setReferenceElement}
      >
        <div
          className={cx(styles.linkModalButton, { [styles.mobileLinkModalButton]: isMobile })}
          role="button"
          onClick={openCloseModal}
          tabIndex={0}
        >
          <Icon />
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            dir={getLangDir(locale)}
            ref={setPopperElement}
            style={isMobile ? {} : popperStyles.popper}
            {...attributes.popper}
          >
            <div data-id="toolbar-modal-button" tabIndex={-1} className={styles.modal}>
              <LinkModal
                isMobile={isMobile}
                t={t}
                theme={theme}
                {...rest}
                {...linkSettingsData}
                {...linkData}
                anchorableBlocksData={anchorableBlocks}
                isActive={toolbarItem.attributes.active}
                onDone={({ data }) => onDone(data, toolbarItem, setModalOpen)}
                onCancel={() => setModalOpen(false)}
                onDelete={() => onDelete(toolbarItem, setModalOpen)}
              />
            </div>
          </div>,
          document.body
        )}
    </ClickOutside>
  );
};

export default withToolbarContext(LinkButton);
