import { getComponentStyles } from './styles';
import React from 'react';

const name = 'styles';

const StylesHOC = Component => {
  const Styles = props => {
    const { context, componentData, isFocused } = props;
    const { isMobile, theme } = context;
    const componentStyles = getComponentStyles({
      componentData,
      theme,
      isFocused,
      isMobile,
    });

    return (
      <div className={Object.values(componentStyles).join(' ')}>
        <Component {...props} />
      </div>
    );
  };

  return Styles;
};

export const createStylesConfig = () => ({
  type: 'extension',
  createExtensionConfig: () => {
    return {
      name,
      priority: 30,
      defaultOptions: {},
      addNodeViewHOC() {
        return {
          nodeTypes: ['*'],
          nodeViewHOC: StylesHOC,
        };
      },
    };
  },
});
