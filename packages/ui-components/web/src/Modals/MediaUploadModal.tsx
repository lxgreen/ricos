import React from 'react';
import styles from '../../statics/styles/url-input-modal.scss';

interface MediaUploadModalProps {
  id?: string;
  inputFileRef: () => void;
  handleClick: () => void;
  handleNativeFileUpload: () => void;
  languageDir: string;
  title: string;
  labelText: string;
  dataHook: string;
  showUploadSection: boolean;
  accept: string;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  id,
  inputFileRef,
  handleClick,
  handleNativeFileUpload,
  languageDir,
  title,
  labelText,
  dataHook,
  showUploadSection,
  accept,
}) => {
  const uploadSection = (
    <div>
      <div className={styles.mediaUploadModal}>
        <input
          id={id}
          type="file"
          accept={accept}
          className={styles.mediaUploadModal_fileInput}
          ref={inputFileRef}
          onClick={handleClick}
          onChange={handleNativeFileUpload}
        />
        <label
          htmlFor={id}
          className={styles.mediaUploadModal_fileInputLabel}
          role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
          data-hook={dataHook}
          tabIndex={0}
        >
          {labelText}
        </label>
      </div>
    </div>
  );
  return (
    <div>
      <div className={styles.header_subTitle} dir={languageDir}>
        {title}
      </div>
      {showUploadSection && uploadSection}
    </div>
  );
};

export default MediaUploadModal;
