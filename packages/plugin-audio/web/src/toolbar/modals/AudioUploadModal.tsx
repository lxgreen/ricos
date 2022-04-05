import React from 'react';
import { AUDIO_TYPE } from '../../types';
import { handleUploadStart, handleUploadFinished } from 'wix-rich-content-plugin-commons';
import { MediaUploadModal } from 'wix-rich-content-ui-components';
import { MEDIA_POPOVERS_BUTTONS_NAMES_BI } from 'wix-rich-content-common';
import * as id3 from 'id3js';

const AudioUploadModal = props => {
  const {
    t,
    handleFileSelection,
    handleFileUpload,
    languageDir,
    helpers,
    onConfirm,
    onReplace,
    pubsub,
    componentData,
  } = props;
  const id = `AudioUploadModal_FileInput_${Math.floor(Math.random() * 9999)}`;
  let blockKey;

  const onUpload = obj => {
    if (onConfirm) {
      const { newBlock } = onConfirm(obj);
      blockKey = newBlock.key;
    } else {
      onReplace(obj, blockKey);
    }
  };

  const closeModal = () => {
    helpers.closeModal();
  };

  const setComponentData = data => {
    pubsub.set('componentData', data, blockKey);
  };

  const getOnUploadFinished = () => {
    return ({ data, error }) => {
      setComponentData({ ...data, error });
    };
  };

  const addAudioComponent = ({ data, error }) => {
    handleUploadFinished(
      AUDIO_TYPE,
      getComponentData,
      data,
      error,
      ({ data, error }) => onUpload({ ...data, error }),
      undefined,
      undefined
    );
    setComponentData({ ...componentData, ...data });
  };

  const onLocalLoad = tempData => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...rest } = tempData;
    const tempComponentData = getComponentData()?.name ? rest : tempData;
    onUpload({ ...getComponentData(), ...tempComponentData });
  };

  const getComponentData = () => ({ ...pubsub.get('componentData'), ...componentData });

  const getAudioTags = async file => {
    let tags;
    try {
      tags = await id3.fromFile(file);
    } catch (error) {
      console.error(error);
    }

    return { name: tags?.title, authorName: tags?.artist };
  };

  const handleNativeFileUpload = async file => {
    const tags = await getAudioTags(file);
    setComponentData({ ...componentData, ...tags });
    handleUploadStart(props, getComponentData, file, onLocalLoad, getOnUploadFinished(), undefined);
    closeModal();
  };

  const hasCustomFileUpload = handleFileUpload || handleFileSelection;

  const handleClick = evt => {
    helpers?.onPluginsPopOverClick?.({
      pluginId: AUDIO_TYPE,
      buttonName: MEDIA_POPOVERS_BUTTONS_NAMES_BI.upload,
    });
    if (handleFileSelection) {
      evt.preventDefault();
      return handleFileSelection(({ data, error }) => {
        addAudioComponent({ data, error });
        closeModal();
      });
    }
  };

  return (
    <MediaUploadModal
      id={id}
      handleClick={handleClick}
      handleChange={handleNativeFileUpload}
      languageDir={languageDir}
      title={t('AudioModal_Upload_Title')}
      labelText={t('AudioModal_Upload_ButtonText')}
      dataHook="AudioModalCustomUpload"
      showUploadSection={hasCustomFileUpload}
      accept="audio/*"
    />
  );
};

export default AudioUploadModal;
