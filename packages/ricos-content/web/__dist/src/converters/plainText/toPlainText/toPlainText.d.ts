import { RichContent } from 'ricos-schema';
interface PlainTextOptions {
    urlShortener?: (url: string) => Promise<string>;
    getVideoUrl?: (fileId: string) => Promise<string>;
    delimiter?: string;
}
export declare const toPlainText: (content: RichContent, options?: PlainTextOptions) => Promise<string>;
export {};
//# sourceMappingURL=toPlainText.d.ts.map