import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { pluginPoll } from 'wix-rich-content-plugin-social-polls/viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import PropTypes from 'prop-types';

const PollViewer = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginPoll(), pluginLink()]} />
);

PollViewer.propTypes = {
  content: PropTypes.object,
};

export default PollViewer;
