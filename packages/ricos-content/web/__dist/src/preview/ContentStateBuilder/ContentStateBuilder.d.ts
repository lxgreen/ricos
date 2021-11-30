import { DraftContent } from '../../types/contentTypes';
import { PluginData, TextBlockWithEntities } from '../ContentStateAnalyzer/types';
declare type ContentBuildMethod = (textBlocksWithEntities: TextBlockWithEntities | TextBlockWithEntities[]) => ContentStateBuilder;
declare type PluginBuildMethod = (pluginData: PluginData) => ContentStateBuilder;
declare type InteractionBuildMethod = (settings?: Record<string, unknown>) => ContentStateBuilder;
declare class ContentStateBuilder {
    contentState: DraftContent;
    h1: ContentBuildMethod;
    h2: ContentBuildMethod;
    h3: ContentBuildMethod;
    h4: ContentBuildMethod;
    h5: ContentBuildMethod;
    h6: ContentBuildMethod;
    quote: ContentBuildMethod;
    plain: ContentBuildMethod;
    code: ContentBuildMethod;
    ol: ContentBuildMethod;
    ul: ContentBuildMethod;
    image: PluginBuildMethod;
    video: PluginBuildMethod;
    gallery: PluginBuildMethod;
    soundCloud: PluginBuildMethod;
    giphy: PluginBuildMethod;
    map: PluginBuildMethod;
    file: PluginBuildMethod;
    divider: PluginBuildMethod;
    link: PluginBuildMethod;
    linkPreview: PluginBuildMethod;
    readMore: InteractionBuildMethod;
    seeFullPost: InteractionBuildMethod;
    imageCounter: InteractionBuildMethod;
    constructor(initialState?: DraftContent);
    get(): DraftContent;
}
export default ContentStateBuilder;
//# sourceMappingURL=ContentStateBuilder.d.ts.map