import { AnyExtension, Node, Mark, Extension } from '@tiptap/core';
import { ComponentType } from 'react';
import { NodeHocDescriptor } from 'ricos-tiptap-types';

export const DEFAULT_PRIORITY = 100;

export interface ConvertableExtension {
  toTiptapExtension(): AnyExtension;
}

export interface SortableExtension {
  priority: number;
}

export interface IdentifiableExtension {
  name: string;
}

export interface IMarkExtension
  extends ConvertableExtension,
    SortableExtension,
    IdentifiableExtension {
  type: 'mark';
}

export interface IReactNodeExtension extends SortableExtension, IdentifiableExtension {
  type: 'react-node';
  getComponent(): ComponentType;
  asRenderable: (decoratedComponent: ComponentType) => DecoratedNodeExtension;
}

export interface IHtmlNodeExtension
  extends SortableExtension,
    IdentifiableExtension,
    ConvertableExtension {
  type: 'html-node';
}

export interface DecoratedNodeExtension extends IReactNodeExtension, ConvertableExtension {}

export interface IFunctionalExtension
  extends ConvertableExtension,
    IdentifiableExtension,
    SortableExtension {
  type: 'extension';
  getNodeHocDescriptor(): NodeHocDescriptor;
}

export type IExtension =
  | IReactNodeExtension
  | IHtmlNodeExtension
  | IFunctionalExtension
  | IMarkExtension;

export type Aggregate<T> = {
  asArray: () => T[];
  filter: (predicate: (t: T) => boolean) => Aggregate<T>;
  sort: () => Aggregate<T>;
};

export type ReactNodeExtensionAggregate = {
  getDecoratedNodeExtensions: (hocComposer: NodeHocComposer) => ConvertableNodeExtensionAggregate;
};

export type ConvertableNodeExtensionAggregate = {
  toTiptapExtensions: () => Node[];
};

export type FunctionalExtensionAggregate = {
  toTiptapExtensions: () => Extension[];
  getNodeHocComposer: () => NodeHocComposer;
};

export type MarkExtensionAggregate = {
  toTiptapExtensions: () => Mark[];
};

export type ExtensionAggregate = {
  getReactNodeExtensions: () => ReactNodeExtensionAggregate;
  getHtmlNodeExtensions: () => ConvertableNodeExtensionAggregate;
  getMarkExtensions: () => MarkExtensionAggregate;
  getFunctionalExtensions: () => FunctionalExtensionAggregate;
};

export type NodeHocComposer = {
  decorate: (nodeExtension: IReactNodeExtension) => DecoratedNodeExtension;
};
