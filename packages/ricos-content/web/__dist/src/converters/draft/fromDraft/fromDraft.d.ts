import { DraftContent } from '../../../types';
import { RichContent } from 'ricos-schema';
export interface FromDraftOptions {
    ignoreUnsupportedValues?: boolean;
}
export declare const ensureRicosContent: (content: RichContent | DraftContent) => RichContent;
export declare const fromDraft: (draftJSON: DraftContent, opts?: FromDraftOptions) => RichContent;
//# sourceMappingURL=fromDraft.d.ts.map