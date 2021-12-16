import React, {
  FunctionComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import { ACTION_COLORS_CSS_VAR } from '..';
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
  const { min = 0, max = 10, onChange, dataHook, ariaProps, value, onSubmit } = props;
  const [fillPercentage, setFillPercentage] = useState(0);
  const trackColors = { fill: ACTION_COLORS_CSS_VAR, unFilled: 'rgba(0,0,0,.2)' };
  const bgStyle = {
    background: `linear-gradient(90deg ,${trackColors.fill} ${fillPercentage}%, ${
      trackColors.unFilled
    } ${fillPercentage + 0.1}%)`,
  };

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

  useEffect(() => {
    setFillPercentage((100 * (value - min)) / (max - min));
  }, [value]);

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
      style={bgStyle}
    />
  );
};

export default Slider;
