import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/video-modal.scss';
import { VIDEO_TYPE } from '../types';
import { handleUploadStart, handleUploadFinished } from 'wix-rich-content-plugin-commons';

export default class VideoUploadModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      url: (!componentData.isCustomVideo && componentData.src) || '',
    };
    this.id = `VideoUploadModal_FileInput_${Math.floor(Math.random() * 9999)}`;
    const { onConfirm, onReplace } = props;
    this.onConfirm = obj => {
      if (onConfirm) {
        const { newBlock } = onConfirm(obj);
        this.blockKey = newBlock.key;
      } else {
        onReplace(obj, this.blockKey);
      }
    };
  }

  closeModal = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  getOnUploadFinished = isCustomVideo => {
    return ({ data, error }) => {
      this.setComponentData({ ...data, error, isCustomVideo });
    };
  };

  addVideoComponent = ({ data, error }, isCustomVideo = false) => {
    handleUploadFinished(VIDEO_TYPE, this.getComponentData, data, error, ({ data, error }) =>
      this.onConfirm({ ...data, error, isCustomVideo })
    );
  };

  setComponentData = data => {
    this.props.pubsub.set('componentData', data, this.blockKey);
  };

  onLocalLoad = ({ src, tempData }) => {
    this.onConfirm({ ...this.props.componentData, src, isCustomVideo: true, tempData });
  };

  getComponentData = () => this.props.componentData;

  handleNativeFileUpload = () => {
    handleUploadStart(
      this.props,
      this.getComponentData,
      this.inputFile.files[0],
      this.onLocalLoad,
      this.getOnUploadFinished(true)
    );
    this.closeModal();
  };

  render() {
    const {
      t,
      handleFileSelection,
      handleFileUpload,
      enableCustomUploadOnMobile,
      isMobile,
      languageDir,
    } = this.props;
    const { styles } = this;
    const hasCustomFileUpload = handleFileUpload || handleFileSelection;
    let handleClick;
    if (handleFileSelection) {
      handleClick = evt => {
        evt.preventDefault();
        return handleFileSelection(({ data, error }) => {
          this.addVideoComponent({ data, error }, true);
          this.closeModal();
        });
      };
    }
    const uploadVideoSection = (
      <div>
        <div className={styles.video_modal_upload_video_new_modal}>
          <input
            id={this.id}
            type="file"
            accept="video/*"
            className={styles.fileInput}
            ref={node => (this.inputFile = node)}
            onClick={handleClick}
            onChange={this.handleNativeFileUpload}
          />
          <label
            htmlFor={this.id}
            className={styles.fileInputLabel}
            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
            data-hook="videoUploadModalCustomVideo"
            tabIndex={0}
          >
            {t('VideoUploadModal_CustomVideoClickText')}
          </label>
        </div>
      </div>
    );
    return (
      <div dir={languageDir}>
        <div className={styles.video_modal_add_a_Video_new_modal}>
          {t('VideoCustomUploadModal_Title')}
        </div>
        {(!isMobile || enableCustomUploadOnMobile) && hasCustomFileUpload && uploadVideoSection}
      </div>
    );
  }
}

VideoUploadModal.propTypes = {
  onReplace: PropTypes.func,
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  handleFileSelection: PropTypes.func,
  handleFileUpload: PropTypes.func,
  enableCustomUploadOnMobile: PropTypes.bool,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  blockKey: PropTypes.string,
};
