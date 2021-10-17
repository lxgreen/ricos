import { getComponentStyles } from './styles';
import React from 'react';
import { RicosFunctionalExtension } from '../../models/extension-types';

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
  Styles.displayName = 'StylesHoc';

  return Styles;
};

export const createStylesConfig = (): RicosFunctionalExtension => ({
  type: 'extension',
  createExtensionConfig: () => {
    return {
      name,
      priority: 30,
      defaultOptions: {},
      addNodeHoc() {
        return {
          nodeTypes: ['*'],
          nodeHoc: StylesHOC,
          priority: 100,
        };
      },
    };
  },
});
