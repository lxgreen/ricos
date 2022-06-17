import type { AnyExtension, Extension, Mark, Node } from '@tiptap/core';
import type { ComponentType } from 'react';
import type { ExtensionProps, Group, NodeHocDescriptor, RicosExtension } from 'ricos-tiptap-types';

export const DEFAULT_PRIORITY = 100;

export interface ConvertableExtension {
  toTiptapExtension(extensions: ExtensionAggregate, ricosProps: ExtensionProps): AnyExtension;
}

export interface SortableExtension {
  priority: number;
}

export interface IdentifiableExtension {
  name: string;
}

export interface Grouped {
  groups: Group[];
}

export interface IMarkExtension
  extends ConvertableExtension,
    SortableExtension,
    IdentifiableExtension,
    Grouped {
  type: 'mark';
  getRicosExtension: () => RicosExtension;
}

export interface IReactNodeExtension extends SortableExtension, IdentifiableExtension, Grouped {
  type: 'node';
  getComponent(): ComponentType;
  asRenderable: (decoratedComponent: ComponentType) => DecoratedNodeExtension;
  getRicosExtension: () => RicosExtension;
}

export interface IHtmlNodeExtension
  extends SortableExtension,
    IdentifiableExtension,
    ConvertableExtension,
    Grouped {
  type: 'node';
  getRicosExtension: () => RicosExtension;
}

export interface DecoratedNodeExtension extends IReactNodeExtension, ConvertableExtension {}

export interface IFunctionalExtension
  extends ConvertableExtension,
    IdentifiableExtension,
    SortableExtension,
    Grouped {
  type: 'extension';
  getNodeHocDescriptor(
    extensions: ExtensionAggregate,
    ricosProps: ExtensionProps
  ): NodeHocDescriptor;
  getRicosExtension: () => RicosExtension;
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
  toTiptapExtensions: (extensions: ExtensionAggregate, ricosProps: ExtensionProps) => Node[];
};

export type FunctionalExtensionAggregate = {
  toTiptapExtensions: (extensions: ExtensionAggregate, ricosProps: ExtensionProps) => Extension[];
  getNodeHocComposer: (
    extensions: ExtensionAggregate,
    ricosProps: ExtensionProps
  ) => NodeHocComposer;
};

export type MarkExtensionAggregate = {
  toTiptapExtensions: (extensions: ExtensionAggregate, ricosProps: ExtensionProps) => Mark[];
};

export type ExtensionAggregate = {
  getReactNodeExtensions: () => ReactNodeExtensionAggregate;
  getHtmlNodeExtensions: () => ConvertableNodeExtensionAggregate;
  getMarkExtensions: () => MarkExtensionAggregate;
  getFunctionalExtensions: () => FunctionalExtensionAggregate;
  getRicosExtensions: () => RicosExtension[];
};

export type NodeHocComposer = {
  decorate: (nodeExtension: IReactNodeExtension) => DecoratedNodeExtension;
};
