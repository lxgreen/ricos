import { PropertyPath } from 'lodash';
import { Node, Node_Type } from 'ricos-schema';
import { RICOS_NODE_TYPE_TO_DATA_FIELD } from '../consts';
interface TranslatableCommons {
    id: Node['id'];
    text: string;
}
export declare type Translatable = TextualTranslatable | NonTextualTranslatable;
/** Node of type `PARAGRAPH` or `HEADING` */
export interface TextualNode extends Node {
    type: TextualNodeType;
}
export declare const isTextualNode: (node: Node) => node is TextualNode;
/** Any node that is not of type `PARAGRAPH` or `HEADING` */
export interface NonTextualNode extends Node {
    type: NonTextualNodeType;
}
export declare const isNonTextualNode: (node: Node) => node is NonTextualNode;
/** Translatable object for `PARAGRAPH` or `HEADING` node */
export interface TextualTranslatable extends TranslatableCommons {
    type: TextualNodeType;
}
export interface NonTextualTranslatable extends TranslatableCommons {
    type: NonTextualNodeType;
    path: PropertyPath;
}
export declare type TextualNodeType = Node_Type.PARAGRAPH | Node_Type.HEADING;
export declare type NonTextualNodeType = Exclude<Node_Type, Node_Type.PARAGRAPH | Node_Type.HEADING>;
declare type NodeToDataField = typeof RICOS_NODE_TYPE_TO_DATA_FIELD;
export declare type DataFieldsNames = NodeToDataField[keyof NodeToDataField] & keyof Node;
export declare type DataFieldNamesWithContainerData = DataFieldsNames & NodeToDataField[keyof Pick<NodeToDataField, Node_Type.BUTTON | Node_Type.DIVIDER | Node_Type.EMBED | Node_Type.FILE | Node_Type.GALLERY | Node_Type.GIF | Node_Type.HTML | Node_Type.IMAGE | Node_Type.LINK_PREVIEW | Node_Type.MAP | Node_Type.VIDEO>];
export declare type DataFieldsWithContainerData = NonNullable<Node[DataFieldNamesWithContainerData]>;
export {};
//# sourceMappingURL=types.d.ts.map