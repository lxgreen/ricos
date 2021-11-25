import React, { FunctionComponent, InputHTMLAttributes, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import styles from '../../statics/styles/slider.scss';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  theme: RichContentTheme;
  onChange: (value: number) => void;
  onSubmit: (value: number) => void;
  dataHook?: string;
  ariaProps?: InputHTMLAttributes<HTMLInputElement>;
}

const Slider: FunctionComponent<SliderProps> = props => {
  const mergedStyles = mergeStyles({ styles, theme: props.theme });
  const { min, max, onChange, dataHook, ariaProps, value, onSubmit } = props;

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        onSubmit((event.target as HTMLInputElement).valueAsNumber);
        break;
      default:
        return;
    }
  };

  return (
    <input
      {...ariaProps}
      tabIndex={0}
      type={'range'}
      className={classNames(mergedStyles.slider, mergedStyles.wrapperSlider)}
      data-hook={dataHook}
      onChange={e => onChange(e.target.valueAsNumber)}
      value={value}
      min={min}
      max={max}
      onMouseUp={e => onSubmit((e.target as HTMLInputElement).valueAsNumber)}
      onKeyUp={onKeyUp}
    />
  );
};

export default Slider;
