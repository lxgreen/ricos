import { CollapsibleListData, RichContent } from 'ricos-schema';
import { CollapsibleListItem } from '../types';
import { AddMethodParams } from './node-builder-methods';
export declare const addCollapsibleList: (generateId: () => string) => ({ items, data, index, before, after, content, }: AddMethodParams<CollapsibleListData> & {
    items: CollapsibleListItem[];
}) => RichContent;
//# sourceMappingURL=collapsible-list-builder-api.d.ts.map