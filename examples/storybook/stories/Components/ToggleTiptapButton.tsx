import React from 'react';
import { ToggleSwitch } from 'wix-style-react';

export const ToggleTiptapButton = ({ isTiptap, setIsTiptap }) => {
  return (
    <>
      <ToggleSwitch checked={isTiptap} onChange={() => setIsTiptap(!isTiptap)} />
      <span>{' Use Tiptap'}</span>
    </>
  );
};
