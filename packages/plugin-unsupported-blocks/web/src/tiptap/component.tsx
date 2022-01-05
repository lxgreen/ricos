import React from 'react';
import { Component } from '../unsupported-blocks-component';
import type { PluginProps } from 'wix-rich-content-editor-common';

export const UnsupportedBlock: React.FC<PluginProps & { label: string }> = ({ context, label }) => {
  const { theme, t } = context;
  return <Component theme={theme} t={t} label={label} />;
};
