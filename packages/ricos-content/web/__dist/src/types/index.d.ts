export declare type NormalizeConfig = {
    anchorTarget?: string;
    relValue?: string;
    disableInlineImages?: boolean;
    removeInvalidInlinePlugins?: boolean;
    disableDownload?: boolean;
    disableImagesExpand?: boolean;
    disableGalleryExpand?: boolean;
};
export interface ComponentData {
    config?: {
        alignment?: string;
        size?: string;
        url?: string;
        textWrap?: string;
        width?: number | string;
        height?: number;
        spoiler?: {
            enabled?: boolean;
            description?: string;
            buttonContent?: string;
        };
        link?: {
            url?: string;
            rel?: string;
            target?: string;
        };
        anchor?: string;
        disableExpand?: boolean;
    };
    src?: any;
    srcType?: string;
    [propName: string]: any;
}
export declare type LinkRange = {
    text: string;
    index: number;
    lastIndex: number;
};
export declare type NormalizationProcessor<T> = (processed: T, ...args: any[]) => T;
export * from './contentTypes';
export * from './contentApi';
export * from './mediaUploadTypes';
export * from './node-refined-types';
//# sourceMappingURL=index.d.ts.map