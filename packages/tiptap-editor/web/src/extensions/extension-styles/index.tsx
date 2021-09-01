import { getComponentStyles, getFocusClassName, stylesWithRTL } from './styles';
import React from 'react';
import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';

const name = 'styles';

const StylesHOC = Component => {
  const Styles = props => {
    const { context, componentData, decorations } = props;
    const { isMobile, theme } = context;
    const componentStyles = getComponentStyles({
      componentData,
      theme,
      isMobile,
    });

    decorations.forEach((decoration, index) => {
      componentStyles[`decoration${index}`] = decoration?.type?.attrs?.class;
    });
    return (
      <div className={Object.values(componentStyles).join(' ')}>
        <Component {...props} />
      </div>
    );
  };

  return Styles;
};

export const createStylesConfig = defaultOptions => ({
  type: 'extension',
  createExtensionConfig: () => {
    return {
      name,
      priority: 30,
      defaultOptions: {
        theme: {},
        ...defaultOptions,
      },
      addNodeViewHOC() {
        return {
          nodeTypes: ['*'],
          nodeViewHOC: StylesHOC,
        };
      },
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: new PluginKey('stylesFocus'),
            props: {
              decorations: ({ doc, selection }) => {
                const { isEditable, isFocused } = this.editor;
                const decorations: Decoration[] = [];

                if (!isEditable || !isFocused) {
                  return DecorationSet.create(doc, []);
                }
                const focusClassName = getFocusClassName(stylesWithRTL, this.options.theme, true);
                doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                  decorations.push(
                    Decoration.node(pos, pos + node.nodeSize, {
                      class: focusClassName,
                    })
                  );
                });

                return DecorationSet.create(doc, decorations);
              },
            },
          }),
        ];
      },
    };
  },
});
