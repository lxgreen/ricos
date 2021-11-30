import { RichContent } from 'ricos-schema';
export declare const emptyContent: RichContent;
export declare const applyContent: (content: RichContent) => <T>(params: Exclude<T, {
    content: any;
}>) => T;
//# sourceMappingURL=consts.d.ts.map