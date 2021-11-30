import { RicosContentBlock, NormalizationProcessor } from '../types';
/**
 * Removes inline headers from a given block.
 *
 * If 'unstyled' block contains only inline headers and spaces (no plain text),
 * it's type is changed to the smallest header block. E.g.: Block with inline-header-one
 * & inline-header-two will be converted to header-two block.
 */
export declare const removeInlineHeaderRanges: NormalizationProcessor<RicosContentBlock>;
//# sourceMappingURL=removeInlineHeaderRanges.d.ts.map