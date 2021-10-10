import { AnyExtension, Node, Mark, Extension } from '@tiptap/core';
import { ComponentType } from 'react';
import { NodeHocDescriptor, RicosNodeProps } from './extension-types';

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

export interface INodeExtension extends SortableExtension, IdentifiableExtension {
  type: 'node';
  getComponent(): ComponentType;
  asRenderable: (decoratedComponent: ComponentType) => DecoratedNodeExtension;
}

export interface DecoratedNodeExtension extends INodeExtension, ConvertableExtension {}

export interface IFunctionalExtension
  extends ConvertableExtension,
    IdentifiableExtension,
    SortableExtension {
  type: 'extension';
  getNodeHocDescriptor(): NodeHocDescriptor;
}

export type IExtension = INodeExtension | IFunctionalExtension | IMarkExtension;

export type Aggregate<T> = {
  asArray: () => T[];
  filter: (predicate: (t: T) => boolean) => Aggregate<T>;
  sort: () => Aggregate<T>;
};

export type NodeExtensionAggregate = {
  getDecoratedNodeExtensions: (hocComposer: NodeHocComposer) => DecoratedNodeExtensionAggregate;
};

export type DecoratedNodeExtensionAggregate = {
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
  getNodeExtensions: () => NodeExtensionAggregate;
  getMarkExtensions: () => MarkExtensionAggregate;
  getFunctionalExtensions: () => FunctionalExtensionAggregate;
};

export type NodeHocComposer = {
  decorate: (nodeExtension: INodeExtension) => DecoratedNodeExtension;
};
