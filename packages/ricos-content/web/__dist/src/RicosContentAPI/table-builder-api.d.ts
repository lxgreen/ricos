import { TableData, RichContent } from 'ricos-schema';
import { TableCell } from '../types';
import { AddMethodParams } from './node-builder-methods';
export declare const addTable: (generateId: () => string) => ({ cells, data, index, before, after, content, }: AddMethodParams<TableData> & {
    cells: TableCell[][];
}) => RichContent;
//# sourceMappingURL=table-builder-api.d.ts.map