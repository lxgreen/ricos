import type { ReactElement } from 'react';
import type {
  DocumentStyle as RichContentDocumentStyle,
  Decoration,
  Decoration_Type,
} from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';

export type TextNodeType = keyof Required<RichContentDocumentStyle>;

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
   * @param {TextNodeType} type
   * @param {Decoration_Type} decoration type
   * @returns  {Decoration}
   * @memberof TextualTheme
   */
  getDecoration(type: TextNodeType, decoration: Decoration_Type): Decoration;
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
   * @param {TextNodeType} type
   * @param {Decoration_Type} decoration type
   * @returns  {Decoration}
   * @memberof DocumentStyle
   */
  getDecoration(type: TextNodeType, decoration: Decoration_Type): Decoration;
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
   * @param {TextNodeType} type
   * @param {Decoration[]} decorations
   * @returns  {DocumentStyle}
   * @memberof DocumentStyle
   */
  setStyle(type: TextNodeType, decorations: Decoration[]): DocumentStyle;
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
   * @param {TextNodeType} type
   * @param {Decoration_Type} decoration type
   * @returns  {Decoration}
   * @memberof Styles
   */
  getDecoration(type: TextNodeType, decoration: Decoration_Type): Decoration;
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
