import React from 'react';
import NoteIcon from './NoteIcon';

const createSideBlockComponent =
  editorCommands =>
  ({ id }) =>
    (
      <button
        onClick={() => editorCommands?.toggleBlockOverlay(id)}
        style={{
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <NoteIcon />
      </button>
    );

export default createSideBlockComponent;
