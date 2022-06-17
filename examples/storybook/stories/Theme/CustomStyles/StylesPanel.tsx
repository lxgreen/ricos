import { findIndex, isEqual } from 'lodash';
import type { FunctionComponent } from 'react';
import React from 'react';
import { AddItem } from 'wix-style-react';
import ListItem from './ListItem';
import type { StyleAttr } from './types';
import styles from './StylesPanel.scss';

const replace = (array: StyleAttr[], existingItem: StyleAttr, newItem: StyleAttr) => {
  const index = findIndex(array, item => isEqual(item, existingItem));
  return array.map((item, idx) => (idx === index ? newItem : item));
};

interface Props {
  stylesArray: StyleAttr[];
  setStyles: (items: StyleAttr[]) => void;
}

const CustomStylesCreator: FunctionComponent<Props> = ({ stylesArray, setStyles }) => {
  const emptyRow: StyleAttr = [undefined, '', ''];
  const addEmptyRow = () => setStyles([...stylesArray, emptyRow]);
  return (
    <div className={styles.panel}>
      {stylesArray.map((item, idx) => (
        <ListItem
          key={idx}
          item={item}
          updateStyle={newItem => setStyles(replace(stylesArray, item, newItem))}
          close={() => setStyles(stylesArray.filter((_, index) => index !== idx))}
        />
      ))}
      <AddItem className={styles.addItem} onClick={addEmptyRow}>
        Add Style
      </AddItem>
    </div>
  );
};

export default CustomStylesCreator;
