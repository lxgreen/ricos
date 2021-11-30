/**
 *
 *
 * Tree-like structure modification API, parametrized by node type
 * @template NodeT tree node type
 */
export interface Modifier<NodeT> {
    filter: (predicate: (node: NodeT) => boolean) => Modifier<NodeT>;
    set: (setter: (node: NodeT) => NodeT | NodeT[]) => NodeT;
}
/**
 * Creates a tree modifier parametrized by node type
 *
 * @template NodeT tree node type
 * @param {(node: NodeT) => NodeT[]} nodesAccessor how to get to child nodes
 * @param {(nodes: NodeT[]) => { [key: string]: NodeT[] }} nodesSetter how to add inner nodes into a parent
 * @param {(root: NodeT)} root tree root (curried)
 */
export declare const getModifier: <NodeT>(nodesAccessor: (node: NodeT) => NodeT[], nodesSetter: (nodes: NodeT[]) => {
    [key: string]: NodeT[];
}) => (root: NodeT) => Modifier<NodeT>;
//# sourceMappingURL=modifier-infra.d.ts.map