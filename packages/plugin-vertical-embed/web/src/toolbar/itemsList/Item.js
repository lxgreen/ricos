/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/item.scss';
import classnames from 'classnames';

class Item extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    t: PropTypes.func.isRequired,
  };

  handleClick = () => this.props.onClick(this.props.item);

  render() {
    const { selected, item, t } = this.props;
    const { name, imageSrc, getDescription } = item;

    return (
      <div
        className={classnames(styles.container, selected && styles.selected)}
        onClick={this.handleClick}
      >
        <div
          style={{ backgroundImage: `url(${imageSrc})` }}
          className={styles.image}
          data-hook="verticalsImage"
        />
        <div className={styles.title}>{name}</div>
        {getDescription && <div className={styles.description}>{getDescription(item)}</div>}
      </div>
    );
  }
}

export default Item;
