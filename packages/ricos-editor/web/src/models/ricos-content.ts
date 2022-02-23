import type { RefinedNode } from 'ricos-content';
import type { DescriptorManager } from './ricos-descriptor';

// type SelectionRange = {
//   from: number;
//   to: number;
// };

// type RicosNodeSelection = {
//   ranges: SelectionRange[];
// };

/**
 * Represents Editor content node.
 * Adds functionality on top of RefinedNode (which, on turn, is based on proto-derived Node)
 *
 * @template T specific Refined Node
 */
export interface RicosNode<T extends RefinedNode> {
  getId(): T['id'];
  getSelection(): boolean;
  setSelection(selection: boolean): RicosNode<T>;
  getRefinedNode(): T;
  getNodes(): RicosNodes<T['nodes'][number] & RefinedNode>;
  // style: NodeStyle; TODO: need to address it (getStyle, setStyle)
}

/**
 * Specific node represetation parametrized by plugin data
 *
 * @extends {RicosNode<RefinedNode>}
 * @template DT plugin data
 */
export interface RicosContentNode<DT> extends RicosNode<RefinedNode> {
  getData(): DT;
  setData(data: DT): RicosContentNode<DT>;
}

/**
 * Basic aggregate over RicosNode
 *
 */
export interface RicosNodes<T extends RefinedNode> {
  /**
   * Filters nodes according to predicate
   *
   * @param {(node: RicosNode<T>) => boolean} predicate
   * @returns  {RicosNodes<T>}
   * @memberof RicosNodes
   */
  filter(predicate: (node: RicosNode<T>) => boolean): RicosNodes<T>;

  /**
   * Appends a new node to nodes
   *
   * @param {T} node
   * @returns  {RicosNodes<T>}
   * @memberof RicosNodes
   */
  // to be expanded to insertBefore/insertAfter/append/insertAt
  insert(node: T): RicosNodes<T>;

  /**
   * Modifies the RicosNode collection according to modification
   *
   * @param {(node: RicosNode<T>) => RicosNode<T>} modification
   * @returns  {RicosNodes<T>}
   * @memberof RicosNodes
   */
  modify(modification: (node: RicosNode<T>) => RicosNode<T>): RicosNodes<T>;

  /**
   * Deletes nodes
   *
   * @returns  {RicosNodes<T>}
   * @memberof RicosNodes
   */
  delete(): RicosNodes<T>;

  /**
   * Gets node array
   *
   * @returns  {RicosNode<T>[]}
   * @memberof RicosNodes
   */
  asArray(): RicosNode<T>[];

  /**
   * Gets RefinedNode subtree
   *
   * @returns  {T[]}
   * @memberof RicosNodes
   */
  getRefinedNodes(): T[];
}

/**
 * Translates underlying editor state to RicosNode based model, back and forth
 *
 * @category internal
 */
export interface RicosNodesRepository {
  /**
   * Constructs RicosNode based model
   *
   * @returns  RicosNodes model
   * @memberof RicosNodesRepository
   */
  getRicosNodes(): RicosNodes<RefinedNode>;

  /**
   * Commits the altered nodes to the underlying editor state
   *
   * @param {DescriptorManager} descriptors
   * @memberof RicosNodesRepository
   */
  commit(descriptors: DescriptorManager): void;
}
