/**
 *
 *
 * Tree-like structure feature extractor
 * @template DT extraction unit data type
 */
export interface Extractor<DT> {
    filter: (predicate: (data: DT) => boolean) => Extractor<DT>;
    map: <MT>(mapper: (data: DT) => MT) => Extractor<MT>;
    chain: <CT>(mapper: (data: DT) => Extractor<CT>) => Extractor<CT>[];
    get: () => DT[];
}
/**
 *
 *
 * @template NodeT tree node type
 * @param {(node: NodeT) => NodeT[]} nodesAccessor how to access child nodes
 * @param {(root: NodeT)} root tree root (curried)
 */
export declare const getExtractor: <NodeT>(nodesAccessor: (node: NodeT) => NodeT[]) => (root: NodeT) => Extractor<NodeT>;
//# sourceMappingURL=extractor-infra.d.ts.map