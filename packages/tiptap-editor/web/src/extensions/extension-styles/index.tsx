import { getComponentStyles } from './styles';
import { createRicosGenericExtensionConfig } from '../../extensions-creators/extension';
import React from 'react';

const name = 'styles';

export const createStylesConfig = () =>
  createRicosGenericExtensionConfig({
    createConfig: () => {
      return {
        name,
        priority: 10,

        addNodeViewHOC() {
          return {
            nodeTypes: ['*'],
            nodeViewHOC: Component => {
              return props => {
                const { context, componentData } = props;
                const { isMobile, theme, isFocused } = context;
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
