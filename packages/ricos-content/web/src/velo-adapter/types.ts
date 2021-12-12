import { Node, RichContent } from 'ricos-schema';
import { Overwrite } from 'utility-types';
import { ContentBuilder } from '../types';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type OriginalAddImageParams = Parameters<ContentBuilder['addImage']>[0];

export interface ImageElement {
  src: string;
  alt?: string;
}

// TODO: modify `addImage.ts` file to work with the new pattern, and change this type
export type AddImageParams = Omit<
  Overwrite<
    OriginalAddImageParams,
    {
      data?: OriginalAddImageParams['data'] | ImageElement | string;
    }
  >,
  'content'
>;

export type ContentBuilderAdapter = {
  append: (node: Node) => ContentBuilderAdapter;
  insertBefore: (id: string, node: Node) => ContentBuilderAdapter;
  insertAfter: (id: string, node: Node) => ContentBuilderAdapter;
  insertAt: (index: number, node: Node) => ContentBuilderAdapter;
  get: () => RichContent;
};

export type CreateBuilder = (
  content: RichContent,
  callback?: (content: RichContent) => void
) => ContentBuilderAdapter;
