import type { ReactElement } from 'react';
import type {
  DocumentStyle as RichContentDocumentStyle,
  Decoration,
  Decoration_Type,
} from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';

type TextNodeType = keyof Required<RichContentDocumentStyle>;

/**
 * Represents textual portion of Ricos Theme
 *
 * @export
 * @interface TextualTheme
 */
export interface TextualTheme {
  /**
   * Extracts given decoration settings for specific node type from the current theme.
   *
   * @param {StyledNodeType} type
   * @param {Decoration_Type} decoration
   * @returns  {Decoration}
   * @memberof TextualTheme
   */
  getDecoration(type: StyledNodeType, decoration: Decoration_Type): Decoration | undefined;
  /**
   * Translates RicosTheme to HTML style tag with CSS variable definitions
   *
   * @returns  {ReactElement}
   * @memberof TextualTheme
   */
  toStyleTag(): ReactElement;
  /**
   * Initializes TextualTheme entity with given RicosTheme
   *
   * @param {RicosTheme} theme
   * @returns  {TextualTheme}
   * @memberof TextualTheme
   */
  setTheme(theme: RicosTheme): TextualTheme;
}

/**
 * Represents Document Style
 *
 * @export
 * @interface DocumentStyle
 */
export interface DocumentStyle {
  /**
   * Extracts given decoration settings for specific node type from the current Document Style.
   *
   * @param {StyledNodeType} type
   * @param {Decoration_Type} decoration
   * @returns  {Decoration}
   * @memberof DocumentStyle
   */
  getDecoration(type: StyledNodeType, decoration: Decoration_Type): Decoration | undefined;
  /**
   * Translates DocumentStyle to HTML style tag with CSS variable definitions
   *
   * @returns  {ReactElement}
   * @memberof DocumentStyle
   */
  toStyleTag(): ReactElement;
  /**
   * Translates DocumentStyle entity to RichContent compatible DocumentStyle object
   *
   * @returns  {RichContentDocumentStyle}
   * @memberof DocumentStyle
   */
  toContent(): RichContentDocumentStyle;
  /**
   * DocumentStyle modification
   *
   * @param {StyledNodeType} type
   * @param {Decoration[]} decorations
   * @returns  {DocumentStyle}
   * @memberof DocumentStyle
   */
  setStyle(type: StyledNodeType, decorations: Decoration[]): DocumentStyle;
  /**
   * Initializes entity with DocumentStyle
   *
   * @param {RichContentDocumentStyle} documentStyle
   * @returns  {DocumentStyle}
   * @memberof DocumentStyle
   */
  setDocumentStyle(documentStyle: RichContentDocumentStyle): DocumentStyle;
}

/**
 * Aggregates Theme and DocumentStyle
 *
 * Responsibilities:
 * - ensures DocumentStyle precedence over Theme
 * - extracts summarized decorations per node type
 *
 * @export
 * @interface Styles
 */
export interface Styles {
  /**
   * Extracts given decoration settings for specific node type from the current Document Style and Theme conjunction
   *
   *
   * @param {StyledNodeType} type
   * @param {Decoration_Type} decoration
   * @returns  {Decoration}
   * @memberof Styles
   */
  getDecoration(type: StyledNodeType, decoration: Decoration_Type): Decoration | undefined;
  /**
   * Exposes TextualTheme
   *
   * @returns  {TextualTheme}
   * @memberof Styles
   */
  getTheme(): TextualTheme;
  /**
   * Exposes DocumentStyle
   *
   * @returns  {DocumentStyle}
   * @memberof Styles
   */
  getDocumentStyle(): DocumentStyle;
  /**
   * Produces HTML style tags for DocumentStyle and Theme, guarantees correct precedence
   *
   * @returns  {ReactElement[]}
   * @memberof Styles
   */
  toStyleTags(): ReactElement[];
}
