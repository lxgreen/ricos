import { DraftContent, RicosContentBlock, RicosEntity } from '../../types/contentTypes';
import { TextBlockWithEntities } from '../ContentStateAnalyzer/types';
declare type PartialBlockConfig = Partial<RicosContentBlock>;
interface BlockDetails {
    contentState: DraftContent;
    text: string;
    type: string;
    config: PartialBlockConfig;
    data?: RicosContentBlock['data'];
}
interface PluginDetails {
    contentState: DraftContent;
    data: Record<string, unknown>;
    config: RicosEntity;
}
export declare const addBlock: ({ contentState, text, type, config }: BlockDetails) => DraftContent;
export declare const addEntity: ({ contentState, data, config }: PluginDetails) => DraftContent;
export declare const addPlugin: ({ contentState, data, config }: PluginDetails) => DraftContent;
export declare const toArray: (content: TextBlockWithEntities | TextBlockWithEntities[]) => TextBlockWithEntities[];
interface BlockMerger extends TextBlockWithEntities {
    contentState: DraftContent;
}
export declare const mergeBlockWithEntities: ({ contentState, block, entities, }: BlockMerger) => DraftContent;
export {};
//# sourceMappingURL=builder-utils.d.ts.map