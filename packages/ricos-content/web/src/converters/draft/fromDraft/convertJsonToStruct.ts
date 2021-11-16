import { isObject } from 'lodash';
import { Struct, Value, NullValue, ListValue } from 'ricos-schema';

export function convertJsonToStruct(json: Record<string, unknown>): Struct {
  if (!isObject(json)) {
    throw new TypeError(`Invalid JSON`);
  }
  const struct = { fields: {} };
  Object.entries(json).forEach(([k, v]) => {
    struct.fields[k] = convertJsonToValue(v);
  });
  return struct;
}

function convertJsonToValue(json: unknown): Value {
  const defaultValue = {
    numberValue: undefined,
    nullValue: undefined,
    stringValue: undefined,
    boolValue: undefined,
  };
  switch (typeof json) {
    case 'number':
      return { ...defaultValue, numberValue: json };
    case 'string':
      return { ...defaultValue, stringValue: json };
    case 'boolean':
      return { ...defaultValue, boolValue: json };
    case 'object':
      if (json === null) {
        return { ...defaultValue, nullValue: NullValue.NULL_VALUE };
      } else if (Array.isArray(json)) {
        return { listValue: convertJsonToList(json), ...defaultValue };
      } else {
        return {
          structValue: convertJsonToStruct(json as Record<string, unknown>),
          ...defaultValue,
        };
      }
    default:
      throw new TypeError('Invalid value');
  }
}

function convertJsonToList(json: unknown[]): ListValue {
  if (!Array.isArray(json)) {
    throw new TypeError('Invalid array');
  }
  const list = { values: [] as Value[] };
  const values = json.map(v => convertJsonToValue(v));
  list.values.push(...values);
  return list;
}
