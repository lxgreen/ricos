//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import VideoSelectionInputModal from './videoSelectionInputModal';
import MediaURLInputModal from './mediaURLInputModal';
import NewVideoModal from './NewVideoModal';
import { mediaTypes } from '../types';

const VideoModal = props => {
  const {
    componentData: { type },
    experiments,
  } = props;

  const useNewModal = experiments?.newVideoModal?.enabled;
  const oldVideoModal = mediaTypes.includes(type) ? MediaURLInputModal : VideoSelectionInputModal;
  const Component = useNewModal ? NewVideoModal : oldVideoModal;

  return <Component {...props} />;
};

export default VideoModal;

VideoModal.propTypes = {
  componentData: PropTypes.object,
  experiments: PropTypes.object,
};
