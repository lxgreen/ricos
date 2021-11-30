/// <reference types="draft-js" />
import { NormalizeConfig, DraftContent } from '../types';
export declare const processContentState: (contentState: DraftContent, config: NormalizeConfig) => {
    blocks: Pick<Pick<Draft.Model.Encoding.RawDraftContentBlock, "key" | "type" | "text" | "depth" | "data"> & Pick<{
        inlineStyleRanges: Pick<Pick<Draft.Model.Encoding.RawDraftInlineStyleRange, "offset" | "length"> & Pick<{
            style: string;
        }, "style">, "style" | "offset" | "length">[];
        entityRanges: Pick<Pick<Draft.Model.Encoding.RawDraftEntityRange, "offset" | "length"> & Pick<{
            key: string | number;
        }, "key">, "key" | "offset" | "length">[];
    }, "inlineStyleRanges" | "entityRanges">, "key" | "type" | "text" | "depth" | "inlineStyleRanges" | "entityRanges" | "data">[];
    entityMap: import("../types").RicosEntityMap;
    documentStyle: import("../types").DocumentStyle | undefined;
    VERSION: string;
};
//# sourceMappingURL=processContentState.d.ts.map