import type { AnyExtension, Node, Mark, Extension } from '@tiptap/core';
import type { ComponentType } from 'react';
import type { Group, NodeHocDescriptor, RicosExtension } from 'ricos-tiptap-types';

export const DEFAULT_PRIORITY = 100;

export interface ConvertableExtension {
  toTiptapExtension(extensions: ExtensionAggregate): AnyExtension;
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

export interface Configurable {
  configure: (config: Record<string, unknown>) => Configurable;
}

export interface IMarkExtension
  extends ConvertableExtension,
    SortableExtension,
    IdentifiableExtension,
    Configurable,
    Grouped {
  type: 'mark';
  getRicosExtension: () => RicosExtension;
}

export interface IReactNodeExtension
  extends SortableExtension,
    IdentifiableExtension,
    Grouped,
    Configurable {
  type: 'node';
  getComponent(): ComponentType;
  asRenderable: (decoratedComponent: ComponentType) => DecoratedNodeExtension;
  getRicosExtension: () => RicosExtension;
}

export interface IHtmlNodeExtension
  extends SortableExtension,
    IdentifiableExtension,
    ConvertableExtension,
    Configurable,
    Grouped {
  type: 'node';
  getRicosExtension: () => RicosExtension;
}

export interface DecoratedNodeExtension extends IReactNodeExtension, ConvertableExtension {}

export interface IFunctionalExtension
  extends ConvertableExtension,
    IdentifiableExtension,
    SortableExtension,
    Configurable,
    Grouped {
  type: 'extension';
  getNodeHocDescriptor(extensions: ExtensionAggregate): NodeHocDescriptor;
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
  toTiptapExtensions: (extensions: ExtensionAggregate) => Node[];
};

export type FunctionalExtensionAggregate = {
  toTiptapExtensions: (extensions: ExtensionAggregate) => Extension[];
  getNodeHocComposer: (extensions: ExtensionAggregate) => NodeHocComposer;
};

export type MarkExtensionAggregate = {
  toTiptapExtensions: (extensions: ExtensionAggregate) => Mark[];
};

export type ExtensionAggregate = {
  getReactNodeExtensions: () => ReactNodeExtensionAggregate;
  getHtmlNodeExtensions: () => ConvertableNodeExtensionAggregate;
  getMarkExtensions: () => MarkExtensionAggregate;
  getFunctionalExtensions: () => FunctionalExtensionAggregate;
  getRicosExtensions: () => RicosExtension[];
  configure: (config: Record<string, unknown>) => ExtensionAggregate;
};

export type NodeHocComposer = {
  decorate: (nodeExtension: IReactNodeExtension) => DecoratedNodeExtension;
};
