import React from 'react';
import PropTypes from 'prop-types';
import { Loader, MediaItemErrorMsg } from 'wix-rich-content-ui-components';
import GalleryViewer from './gallery-viewer';
import { DEFAULTS } from './defaults';
import styles from '../statics/styles/gallery-component.scss';

const renderMobileNativeLoader = ({ url }) =>
  url ? null : (
    <div className={styles.mobileNativeLoaderContainer}>
      <Loader type={'mini'} disableProgress />
    </div>
  );

function GalleryComponent(props) {
  const { t, isLoading, componentData, loadingPercentage } = props;
  const { error } = componentData;
  return (
    <>
      <GalleryViewer
        componentData={componentData}
        settings={props.settings}
        theme={props.theme}
        helpers={props.helpers}
        isMobile={props.isMobile}
        anchorTarget={props.anchorTarget}
        relValue={props.relValue}
        blockKey={props.block.getKey()}
        itemOverlayElement={renderMobileNativeLoader}
      />
      {!error && (isLoading || componentData.loading) && (
        <Loader type={'medium'} percent={loadingPercentage} />
      )}
      {error && <MediaItemErrorMsg error={error} t={t} />}
    </>
  );
}

GalleryComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  settings: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  error: PropTypes.object,
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  loadingPercentage: PropTypes.number,
};

export { GalleryComponent as Component, DEFAULTS };
