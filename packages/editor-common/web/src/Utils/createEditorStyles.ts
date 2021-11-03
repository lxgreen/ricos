import classNames from 'classnames';
import { CSSProperties } from 'react';

interface EditorStyleCreatorArgs {
  theme?: Record<string, string>;
  isMobile?: boolean;
  isInnerRCE?: boolean;
  containerStyle?: CSSProperties;
  draftStyles?;
  editorStyles?;
}

export const createEditorStyles = ({
  isInnerRCE,
  isMobile,
  containerStyle,
  theme = {},
  draftStyles = {},
  editorStyles = {},
}: EditorStyleCreatorArgs) => {
  const editorStyle = isInnerRCE ? { backgroundColor: 'transparent' } : {};
  const themeDesktopStyle = theme.desktop
    ? { [theme.desktop]: !isMobile && theme && theme.desktop }
    : {};
  const containerClassName = classNames(draftStyles.wrapper, editorStyles.wrapper, theme.wrapper, {
    [editorStyles.desktop]: !isMobile,
    ...themeDesktopStyle,
  });
  return {
    editorStyle,
    editorClassName: classNames(editorStyles.editor, theme.editor),
    containerStyle,
    containerClassName,
  };
};
