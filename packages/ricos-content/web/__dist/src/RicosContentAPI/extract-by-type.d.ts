import { Media, Node_Type, RichContent } from 'ricos-schema';
/**
 * Extracts textual portion of the provided content
 *
 * @param {RichContent} content the full content
 * @returns  {string[]} collection of text fragments
 */
export declare const getText: (content: RichContent) => string[];
/**
 * Extracts data items of specified plugin type from the provided content
 *
 * @template T data item type
 * @param {RichContent} content the full content
 * @param {Node_Type} type desired plugin type
 * @returns {T[]} collection of data items
 */
export declare const getPluginData: <T>(content: RichContent, type: Node_Type) => T[];
/**
 * Extracts media data of images and videos from the provided content
 *
 * @param {RichContent} content the full content
 * @returns  {Media[]} media data
 */
export declare const getMedia: (content: RichContent) => Media[];
//# sourceMappingURL=extract-by-type.d.ts.map