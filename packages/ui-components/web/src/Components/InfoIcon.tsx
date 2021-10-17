import React, { Component } from 'react';
import generalStyles from '../../statics/styles/info-icon.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import Icon from '../Icons/InfoIcon';

class InfoIcon extends Component<{
  tooltipText?: string;
  iconStyles?: string;
}> {
  render() {
    const { tooltipText, iconStyles } = this.props;
    const style = iconStyles || generalStyles.infoIcon;
    return (
      <Tooltip content={tooltipText}>
        <Icon className={style} />
      </Tooltip>
    );
  }
}

export default InfoIcon;
