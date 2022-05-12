import React from 'react';

export const ToggleEditorButton = ({ isTiptap, setIsTiptap }) => {
  return (
    <button style={{ fontSize: 18 }} onClick={() => setIsTiptap(!isTiptap)}>
      {`use ${isTiptap ? 'Draft' : 'Tiptap'}`}
    </button>
  );
};
