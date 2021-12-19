import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { SelectionList, SelectionListItem } from 'wix-rich-content-ui-components';
import styles from '../../../statics/styles/thumbnail-placement-selector.rtlignore.scss';

import { LayoutThumbnailsIcon } from '../../icons';
class ThumbnailPlacementSelector extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  dataSource = [
    { alignment: 'bottom', dataHook: 'thumbnailPlacementBottom' },
    { alignment: 'left', dataHook: 'thumbnailPlacementLeft' },
    { alignment: 'top', dataHook: 'thumbnailPlacementTop' },
    { alignment: 'right', dataHook: 'thumbnailPlacementRight' },
  ];

  dataMapper = ({ alignment }) => ({ value: alignment });

  renderOption = ({ item, selected }) => (
    <SelectionListItem
      icon={
        <LayoutThumbnailsIcon
          className={this.styles[`thumbnailPlacementSelector_${item.alignment}`]}
        />
      }
      selected={selected}
    />
  );

  render() {
    const { value, onChange, t } = this.props;
    const thumbnailPlacementLabel = t('GallerySettings_Thumbnail_Placement');
    return (
      <div>
        <span className={this.styles.thumbnailPlacementSelector_label}>
          {thumbnailPlacementLabel}
        </span>
        <SelectionList
          theme={this.props.theme}
          className={this.styles.thumbnailPlacementSelector_grid}
          dataSource={this.dataSource}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

ThumbnailPlacementSelector.propTypes = {
  value: PropTypes.oneOf(['bottom', 'left', 'top', 'right']),
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default ThumbnailPlacementSelector;
