import { RichContent } from 'ricos-schema';
import { initializeMetadata } from '../converters/nodeUtils';
declare type EmptyContentCreator = (metadata?: Parameters<typeof initializeMetadata>[0]) => RichContent;
/**
 * Initializes an empty `RichContent` object
 * @param metadata Optional metadata params
 * @returns Empty `RichContent` object
 */
export declare const createEmptyContent: EmptyContentCreator;
export {};
//# sourceMappingURL=createEmptyContent.d.ts.map