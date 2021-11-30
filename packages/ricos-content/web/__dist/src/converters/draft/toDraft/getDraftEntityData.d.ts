import { Node } from 'ricos-schema';
import { RicosEntityMap } from '../../../types';
import { DraftTypedDecoration } from './decorationParsers';
export declare const createDecorationEntityData: (decoration: DraftTypedDecoration, entityKey: number) => RicosEntityMap;
export declare const createAtomicEntityData: (node: Node, entityKey: number) => RicosEntityMap;
export declare const createTextBlockData: (node: Node) => any;
//# sourceMappingURL=getDraftEntityData.d.ts.map