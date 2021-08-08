import { getComponentStyles } from './styles';
import { createRicosGenericExtensionConfig } from '../../extensions-creators/extension';
import React from 'react';

const name = 'styles';

export const createStylesConfig = () =>
  createRicosGenericExtensionConfig({
    type: 'extension',
    createConfig: () => {
      return {
        name,
        priority: 10,

        addNodeViewHOC() {
          return {
            nodeTypes: ['*'],
            nodeViewHOC: Component => {
              return props => {
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
            },
          };
        },
      };
    },
  });
