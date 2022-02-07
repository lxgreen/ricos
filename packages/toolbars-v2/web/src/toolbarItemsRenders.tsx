import React from 'react';
import { ToggleButton } from './components/buttons/ToggleButton';

export const toolbarItemsRenders = {
  bold: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  italic: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  underline: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  quote: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  codeBlock: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  orderedList: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  unorderedList: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  textSpoiler: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  increaseIndent: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  decreaseIndent: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
};
