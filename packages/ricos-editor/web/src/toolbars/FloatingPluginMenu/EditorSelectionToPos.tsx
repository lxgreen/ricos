import React, { useState, useEffect } from 'react';
import { posToDOMRect } from '../utils/posToDOMRect';

const EditorSelectionToPos = ({ children, editor, offsetTop }) => {
  const [position, setPosition] = useState({});

  const handleButtonPosition = () => {
    const { selection } = editor.state;
    const { top } = posToDOMRect(editor.view, selection.from, selection.to);
    const verticalPos = { top: `${top - offsetTop}px` };
    setPosition(verticalPos);
  };

  useEffect(() => {
    editor.on('selectionUpdate', handleButtonPosition);
  }, [offsetTop]);

  return React.cloneElement(children, { position });
};

export default EditorSelectionToPos;
