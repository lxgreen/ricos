import { Node, Node_Type } from 'ricos-schema';
export declare const nestedNodesConverters: {
    COLLAPSIBLE_LIST: (entity: any) => Node | undefined;
    TABLE: (entity: any) => {
        id: string;
        type: Node_Type;
        nodes: {
            id: string;
            type: Node_Type;
            tableCellData: {
                cellStyle: {
                    verticalAlignment: string | undefined;
                    backgroundColor: string | undefined;
                };
                borderColors: {
                    top: string | undefined;
                    left: string | undefined;
                    right: string | undefined;
                    bottom: string | undefined;
                };
            };
            nodes: Node[];
        }[];
    }[];
};
//# sourceMappingURL=nestedNodesUtils.d.ts.map