/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, forwardRef, useImperativeHandle, useContext } from 'react';
import PropTypes from 'prop-types';
import AvatarIcon from '../icons/AvatarIcon';
import classNames from 'classnames';
import { RicosContext } from 'wix-rich-content-editor-common';
import styles from '../../statics/mention-list.scss';

const MentionList = forwardRef((props, ref) => {
  const { languageDir } = useContext(RicosContext) || {};

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = index => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return props.items.length ? (
    <div dir={languageDir} className={styles.mention_list}>
      {props.items.map((item, i) => (
        <div
          key={i}
          className={classNames(styles.mention_item, {
            [styles.mention_item_selected]: i === selectedIndex,
          })}
          onMouseOver={() => setSelectedIndex(i)}
          onClick={() => selectItem(i)}
        >
          <AvatarIcon />
          {item}
        </div>
      ))}
    </div>
  ) : null;
});

MentionList.propTypes = {
  items: PropTypes.array,
  command: PropTypes.func,
  container: PropTypes.element,
};

export default MentionList;
