import React from 'react';
import UnsupportedBlocks from './unsupported-blocks';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
  label: string;
}

class UnsupportedBlocksComponent extends React.Component<Props> {
  static type = { UNSUPPORTED_BLOCKS_TYPE };

  render() {
    const { theme, t, label } = this.props;
    return <UnsupportedBlocks theme={theme} t={t} label={label} />;
  }
}

export { UnsupportedBlocksComponent as Component, DEFAULTS };
