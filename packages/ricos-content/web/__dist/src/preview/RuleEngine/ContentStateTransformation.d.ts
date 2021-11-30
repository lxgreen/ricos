import { DraftContent } from '../../types/contentTypes';
import { PreviewRule } from '../types';
interface Constructor extends PreviewRule {
    initialPreviewState?: DraftContent;
}
declare class ContentStateTransformation {
    rules: PreviewRule[];
    previewState?: DraftContent;
    constructor({ _if, _then, initialPreviewState }: Constructor);
    rule({ _if, _then }: PreviewRule): this;
    apply(contentState: DraftContent): DraftContent;
    toObject(): {
        _if: string;
        _then: string;
    }[];
}
export default ContentStateTransformation;
//# sourceMappingURL=ContentStateTransformation.d.ts.map