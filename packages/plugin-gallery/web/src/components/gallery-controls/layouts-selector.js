import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getGalleryLayoutsSettings } from '../../layout-helper';
import { mergeStyles } from 'wix-rich-content-common';
import { SelectionList, SelectionListItem, Label } from 'wix-rich-content-ui-components';
import styles from '../../../statics/styles/layout-selector.scss';

class LayoutSelector extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  useNewSettingsUi = !!this.props.experiments.newSettingsModals?.enabled;

  getLayouts = t => {
    return getGalleryLayoutsSettings(t).map(layout => {
      return {
        layoutId: layout.value,
        name: layout.label,
        icon: layout.icon,
        dataHook: `layoutSelector_${layout.label}`,
      };
    });
  };

  dataMapper = ({ layoutId }) => ({ value: layoutId });

  renderOption = ({ item, selected }) =>
    this.useNewSettingsUi ? (
      <SelectionListItem label={item.name} selected={selected} icon={<item.icon />} />
    ) : (
      <div className={this.styles.layoutsSelector_tile}>
        <item.icon
          className={classNames(this.styles.layoutsSelector_icon, {
            [this.styles.layoutsSelector_icon_selected]: selected,
          })}
        />
        <span className={this.styles.layoutsSelector_tile_label}>{item.name}</span>
      </div>
    );

  render() {
    const styles = this.styles;
    const { value, theme, onChange, t } = this.props;
    const layoutsLabel = t('GalleryPlugin_Layouts_Title');
    return (
      <div>
        <Label label={layoutsLabel} />
        <SelectionList
          theme={theme}
          className={styles.layoutsSelector_grid}
          dataSource={this.getLayouts(t)}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={value => onChange(value)}
          optionClassName={styles.layoutsSelector_option}
          useNewSettingsUi={this.useNewSettingsUi}
        />
      </div>
    );
  }
}

LayoutSelector.propTypes = {
  value: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  experiments: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default LayoutSelector;
