import { RichContent } from 'ricos-schema';
import { Overwrite } from 'utility-types';
import { ContentBuilder } from '../types';
export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type OriginalAddImageParams = Parameters<ContentBuilder['addImage']>[0];
export interface ImageElement {
    src: string;
    alt?: string;
}
export declare type AddImageParams = Omit<Overwrite<OriginalAddImageParams, {
    data?: OriginalAddImageParams['data'] | ImageElement | string;
}>, 'content'>;
export declare type ContentBuilderAdapter = {
    [key in keyof ContentBuilder]: (param?: Omit<Parameters<ContentBuilder[key]>[0], 'content'>) => ContentBuilderAdapter;
} & {
    addImage: (params: AddImageParams) => ContentBuilderAdapter;
    get: () => RichContent;
};
export declare type CreateBuilder = (content: RichContent, callback?: (content: RichContent) => void) => ContentBuilderAdapter;
//# sourceMappingURL=types.d.ts.map