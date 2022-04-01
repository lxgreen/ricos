import React from 'react';
import { Component } from '../unsupported-blocks-component';
import type { PluginProps } from 'ricos-tiptap-types';

export const UnsupportedBlock: React.FC<PluginProps> = ({ context }) => {
  const { theme, t } = context;
  return (
    <div contentEditable={false}>
      <Component theme={theme} t={t} />
    </div>
  );
};
