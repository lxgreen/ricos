import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import styles from '../statics/styles/unsupported-blocks.scss';
import CircleInfoIcon from './icons/CircleInfoIcon';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
  label?: string;
}
class UnsupportedBlocks extends Component<Props> {
  styles!: Record<string, string>;

  render() {
    const { t, theme, label } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });

    return (
      <div className={styles.unsupportedBlocks_alert}>
        <CircleInfoIcon />
        <div>{label ?? t('UnsupportedPlugin_message')}</div>
      </div>
    );
  }
}

export default UnsupportedBlocks;
