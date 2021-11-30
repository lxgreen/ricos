import { Struct, Value, NullValue, ListValue } from 'ricos-schema';
export declare type BoolValue = {
    boolValue: boolean;
    numberValue: undefined;
    stringValue: undefined;
    nullValue: undefined;
};
export declare const isBoolValue: (val: Value) => val is BoolValue;
export declare type StringValue = {
    stringValue: string;
    boolValue: undefined;
    numberValue: undefined;
    nullValue: undefined;
};
export declare const isStringValue: (val: Value) => val is StringValue;
export declare type NumberValue = {
    numberValue: number;
    boolValue: undefined;
    stringValue: undefined;
    nullValue: undefined;
};
export declare const isNumberValue: (val: Value) => val is NumberValue;
export declare type ArrayValue = {
    listValue: ListValue;
    boolValue: undefined;
    numberValue: undefined;
    stringValue: undefined;
    nullValue: undefined;
};
export declare const isArrayValue: (val: Value) => val is ArrayValue;
export declare type StructValue = {
    structValue: Struct;
    boolValue: undefined;
    numberValue: undefined;
    stringValue: undefined;
    nullValue: undefined;
};
export declare const isStructValue: (val: Value) => val is StructValue;
export declare type EmptyValue = {
    boolValue: undefined;
    numberValue: undefined;
    stringValue: undefined;
    nullValue: NullValue.NULL_VALUE;
};
export declare const isNullValue: (val: Value) => val is EmptyValue;
//# sourceMappingURL=struct-refined-types.d.ts.map