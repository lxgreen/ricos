import React from 'react';
import {
  ToggleButton,
  AlignmentButton,
  HeadingButton,
  CustomHeadingButton,
  LineSpacingButton,
  FontSizeButton,
  LinkButton,
  TextColorButton,
  HighlightColorButton,
  TitleButton,
  OpenAddPluginPanel,
} from './components/buttons';
import { ToolbarButtonSeparator } from './components/ToolbarButtonSeparator';

export const toolbarItemsRenders = {
  openAddPluginPanel: toolbarItem => {
    return <OpenAddPluginPanel toolbarItem={toolbarItem} />;
  },
  separator: () => {
    return <ToolbarButtonSeparator />;
  },
  undo: toolbarItem => {
    return <ToggleButton onClick={e => toolbarItem.commands?.undo(e)} toolbarItem={toolbarItem} />;
  },
  redo: toolbarItem => {
    return <ToggleButton onClick={e => toolbarItem.commands?.redo(e)} toolbarItem={toolbarItem} />;
  },
  bold: toolbarItem => {
    return (
      <ToggleButton onClick={e => toolbarItem.commands?.toggleBold(e)} toolbarItem={toolbarItem} />
    );
  },
  italic: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.toggleItalic(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  underline: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.toggleUnderline(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  quote: toolbarItem => {
    return (
      <ToggleButton onClick={e => toolbarItem.commands?.toggleQuote(e)} toolbarItem={toolbarItem} />
    );
  },
  codeBlock: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.toggleCodeblock(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  orderedList: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.toggleOrderedList(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  unorderedList: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.toggleUnorderedList(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  textSpoiler: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.toggleSpoiler(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  increaseIndent: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.increaseIndent(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  decreaseIndent: toolbarItem => {
    return (
      <ToggleButton
        onClick={e => toolbarItem.commands?.decreaseIndent(e)}
        toolbarItem={toolbarItem}
      />
    );
  },
  alignment: toolbarItem => {
    return <AlignmentButton toolbarItem={toolbarItem} />;
  },
  title: toolbarItem => {
    return <TitleButton toolbarItem={toolbarItem} />;
  },
  heading: toolbarItem => {
    return <HeadingButton toolbarItem={toolbarItem} />;
  },
  customHeading: toolbarItem => {
    return <CustomHeadingButton toolbarItem={toolbarItem} />;
  },
  lineSpacing: toolbarItem => {
    return <LineSpacingButton toolbarItem={toolbarItem} />;
  },
  fontSize: toolbarItem => {
    return <FontSizeButton toolbarItem={toolbarItem} />;
  },
  link: toolbarItem => {
    return <LinkButton toolbarItem={toolbarItem} />;
  },
  textColor: toolbarItem => {
    return <TextColorButton toolbarItem={toolbarItem} />;
  },
  highlightColor: toolbarItem => {
    return <HighlightColorButton toolbarItem={toolbarItem} />;
  },
  delete: toolbarItem => {
    return <ToggleButton onClick={e => toolbarItem.commands.delete(e)} toolbarItem={toolbarItem} />;
  },
};
