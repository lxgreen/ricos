import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/mention-list.scss';
import classNames from 'classnames';

const MentionList = forwardRef((props, ref) => {
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

  const Container = props.container.type || 'div';
  return (
    <Container className={styles.items} {...(props.container.props || {})}>
      {props.items.map((item, index) => (
        <button
          className={classNames(styles.item, index === selectedIndex && styles.selected)}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item}
        </button>
      ))}
    </Container>
  );
});

MentionList.propTypes = {
  items: PropTypes.array,
  command: PropTypes.func,
  container: PropTypes.element,
};

export default MentionList;
