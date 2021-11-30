import { RicosContentBlock, NormalizationProcessor } from '../types';
/**
 * fixAtomicBlockText
 * @description sets whitespace as atomic block text
 */
export declare const fixAtomicBlockText: NormalizationProcessor<RicosContentBlock>;
/**
 * addInlineStyleRanges
 * @description ensures that block.inlineStyleRanges is defined ([] by default)
 */
export declare const addInlineStyleRanges: NormalizationProcessor<RicosContentBlock>;
/**
 * fixLinkUnderlineRange
 * @description adds underline inline style ranges to links
 */
export declare const addLinkUnderlineRange: NormalizationProcessor<RicosContentBlock>;
//# sourceMappingURL=block-processors.d.ts.map