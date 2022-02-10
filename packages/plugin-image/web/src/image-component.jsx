import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './image-viewer';
import { DEFAULTS } from './consts';
import { sizeClassName, alignmentClassName } from './classNameStrategies';
import { MediaItemErrorMsg, Loader } from 'wix-rich-content-ui-components';

class ImageComponent extends React.Component {
  static alignmentClassName = (componentData, theme, styles, isMobile) =>
    alignmentClassName(componentData, theme, styles, isMobile);

  static sizeClassName = (componentData, theme, styles, isMobile) =>
    sizeClassName(componentData, theme, styles, isMobile);

  constructor(props) {
    super(props);

    const { block, store } = this.props;
    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleMetadataChange', blockKey, this.handleMetadataChange.bind(this));
    }
  }

  handleMetadataChange = newMetadata => {
    const { componentData } = this.props;
    const metadata = { ...componentData.metadata, ...newMetadata };
    this.props.store.update(
      'componentData',
      { ...componentData, metadata },
      this.props.block.getKey()
    );
  };

  handleCaptionChange = caption => this.handleMetadataChange({ caption });

  render() {
    const {
      settings,
      componentData,
      className,
      blockProps,
      theme,
      isMobile,
      helpers,
      getInPluginEditingMode,
      setInPluginEditingMode,
      setComponentUrl,
      t,
      isLoading,
    } = this.props;

    const { error } = componentData;

    return (
      <>
        <ImageViewer
          theme={theme}
          isMobile={isMobile}
          helpers={helpers}
          getInPluginEditingMode={getInPluginEditingMode}
          setInPluginEditingMode={setInPluginEditingMode}
          componentData={componentData}
          className={className}
          isLoading={this.props.isLoading}
          dataUrl={this.props.tempData?.dataUrl}
          settings={settings}
          defaultCaption={this.props.t('ImageViewer_Caption')}
          onCaptionChange={this.handleCaptionChange}
          setFocusToBlock={blockProps.setFocusToBlock}
          setComponentUrl={setComponentUrl}
        />
        {(isLoading || componentData.loading) && <Loader type={'medium'} />}
        {error && <MediaItemErrorMsg error={error} t={t} />}
      </>
    );
  }
}

ImageComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  settings: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  getInPluginEditingMode: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  isMobile: PropTypes.bool.isRequired,
  setComponentUrl: PropTypes.func,
  isLoading: PropTypes.bool,
  tempData: PropTypes.object,
};

export { ImageComponent as Component, DEFAULTS };
