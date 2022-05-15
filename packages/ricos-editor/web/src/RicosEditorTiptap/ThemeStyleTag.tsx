import { isEqual } from 'lodash';
import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { themeStrategy } from 'ricos-common';
import type { RicosTheme } from 'ricos-common';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ThemeStyleTag: FC<{ theme?: RicosTheme }> = props => {
  const runStrategy = (ricosTheme?: RicosTheme) => themeStrategy({ ricosTheme }).html;

  const [styleTag, setStyleTag] = useState(runStrategy(props.theme));
  const prevTheme = usePrevious(props.theme);

  useEffect(() => {
    if (!isEqual(prevTheme, props.theme)) {
      setStyleTag(runStrategy(props.theme));
    }
  });

  return styleTag;
};

export default ThemeStyleTag;
