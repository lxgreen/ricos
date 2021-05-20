import React, { useContext } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { EditorPropsContext } from '../../context';
import { createDividerPlugin2 } from 'wix-rich-content-plugin-divider';
import classNames from 'classnames';
import styles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';
import rtlIgnoredStyles from 'wix-rich-content-common/dist/statics/styles/general.rtlignore.scss';

const Component = ({ isSelected, node }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorProps: any = useContext(EditorPropsContext);
  if (!editorProps) {
    return null;
  }

  console.log({ isSelected });
  const dividerPlugin = createDividerPlugin2(editorProps);
  const dividerProps = dividerPlugin.props;
  const Divider = dividerPlugin.component;
  const hasFocus = isSelected; //(isFocused ? !noPluginBorder : isPartOfSelection) && isEditorFocused;
  const mergedStyles = { ...styles, ...rtlIgnoredStyles };
  const {
    theme,
    withHorizontalScroll,
    noPluginBorder,
    isMobile,
    pluginDecorationProps,
    className,
  } = editorProps;
  const { containerClassName } = pluginDecorationProps?.(editorProps, node.attrs) || {};

  const ContainerClassNames = classNames(
    styles.pluginContainer,
    theme.pluginContainer,
    theme.pluginContainerWrapper,
    withHorizontalScroll && mergedStyles.horizontalScrollbar,
    noPluginBorder && mergedStyles.noBorder,
    {
      [mergedStyles.pluginContainerMobile]: isMobile,
      [theme.pluginContainerMobile]: isMobile,
      [containerClassName]: !!containerClassName,
    },
    className || '',
    {
      [mergedStyles.hasFocus]: hasFocus,
      [theme.hasFocus]: hasFocus,
      [mergedStyles.hideTextSelection]: !isSelected,
    }
  );
  return (
    <NodeViewWrapper as="div">
      <div className={ContainerClassNames}>
        <Divider {...dividerProps} />
      </div>
    </NodeViewWrapper>
  );
};

export default Component;
