import React, { Component } from 'react';
import classNames from 'classnames';
import RadioGroup, { RadioGroupDataSource } from './RadioGroup';
import InfoIcon from './InfoIcon';
import { mergeStyles, RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import styles from '../../statics/styles/radio-group-horizontal.scss';
import infoIconStyles from '../../statics/styles/info-icon.scss';

interface RadioGroupHorizontalProps {
  label?: string;
  dataSource: RadioGroupDataSource[];
  disabled?: boolean;
  theme: RichContentTheme;
  onChange: (value: string) => void;
  value: string;
  inline?: boolean;
  tooltipTextKey?: string;
  t?: TranslationFunction;
}

class RadioGroupHorizontal extends Component<RadioGroupHorizontalProps> {
  styles: Record<string, string>;

  id: string;

  constructor(props: RadioGroupHorizontalProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `h_group_${Math.floor(Math.random() * 9999)}`;
  }

  render() {
    const { label, inline, tooltipTextKey, t, ...props } = this.props;
    const { styles } = this;
    const groupClassName = classNames(
      styles.radioGroupHorizontal_group,
      inline && styles.radioGroupHorizontal_groupInline,
      !inline && styles.radioGroupHorizontal_groupTwoColumns
    );

    return (
      <div>
        <div className={infoIconStyles.infoContainer}>
          {label ? (
            <span id={`${this.id}_label`} className={styles.radioGroupHorizontal_title}>
              {label}
            </span>
          ) : null}
          {tooltipTextKey && <InfoIcon tooltipText={t?.(tooltipTextKey)} />}
        </div>
        <RadioGroup ariaLabelledBy={`${this.id}_label`} {...props} className={groupClassName} />
      </div>
    );
  }
}

export default RadioGroupHorizontal;
