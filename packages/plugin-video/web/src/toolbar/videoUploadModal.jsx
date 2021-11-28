import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VIDEO_TYPE } from '../types';
import { handleUploadStart, handleUploadFinished } from 'wix-rich-content-plugin-commons';
import { MediaUploadModal } from 'wix-rich-content-ui-components';

export default class VideoUploadModal extends Component {
  constructor(props) {
    super(props);
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

  setInputFile = ref => (this.inputFile = ref);

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

    const hasCustomFileUpload = handleFileUpload || handleFileSelection;
    const showUploadSection = (!isMobile || enableCustomUploadOnMobile) && hasCustomFileUpload;

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

    return (
      <MediaUploadModal
        id={this.id}
        isMobile={isMobile}
        inputFileRef={this.setInputFile}
        handleClick={handleClick}
        handleNativeFileUpload={this.handleNativeFileUpload}
        languageDir={languageDir}
        title={t('VideoCustomUploadModal_Title')}
        labelText={t('VideoUploadModal_CustomVideoClickText')}
        dataHook="videoUploadModalCustomVideo"
        showUploadSection={showUploadSection}
        accept="video/*"
      />
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
