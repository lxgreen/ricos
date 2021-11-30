import { RichContent } from 'ricos-schema';
/**
 * Duplicates `RichContent` object, and assigning a newly generated `id`
 * @param content = `RichContent` object
 * @returns Cloned object with new `id`
 */
export declare const duplicate: (content: RichContent) => RichContent;
/**
 * Ensure that a given `RichContent` object contains an id
 * by generating one (if not exist) or leaving it as is (if it does).
 * If no content is provided, an empty content with a new id is generated.
 * @param content (optional) `RichContent` object
 * @returns `RichContent` object with `id`
 */
export declare const ensureContentId: (content?: RichContent | undefined) => RichContent;
/**
 * Extract `id` from content. If not exists, returns `undefined`
 * @param content `RichContent` object
 * @returns `id`
 */
export declare const extractIdFromContent: (content: RichContent) => string | undefined;
//# sourceMappingURL=metadata-utils.d.ts.map