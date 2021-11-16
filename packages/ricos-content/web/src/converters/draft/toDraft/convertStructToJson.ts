import { isObject } from 'lodash';
import { Struct, Value, NullValue, ListValue } from 'ricos-schema';

export function convertStructToJson(message: Struct): Record<string, unknown> {
  const json: Record<string, unknown> = {};
  Object.entries(message.fields).forEach(([k, v]) => {
    json[k] = convertValueToJson(v);
  });
  return json;
}

function convertValueToJson(message: Value) {
  if (
    !message.boolValue &&
    !message.nullValue &&
    !message.numberValue &&
    !message.stringValue &&
    !message.listValue &&
    !message.structValue
  ) {
    throw new TypeError('Invalid value');
  }
  if (message.boolValue) {
    return message.boolValue;
  } else if (message.stringValue) {
    return message.stringValue;
  } else if (message.numberValue) {
    return message.numberValue;
  } else if (message.nullValue === NullValue.NULL_VALUE) {
    return null;
  } else if (message.listValue) {
    if (!Array.isArray(message.listValue?.values)) {
      throw new TypeError('Invalid list value');
    }
    return convertListToJson(message.listValue);
  } else if (message.structValue) {
    if (!isObject(message.structValue.fields)) {
      throw new TypeError('Invalid struct value');
    }
    return convertStructToJson(message.structValue);
  }
}

function convertListToJson(message: ListValue): unknown[] {
  return message.values.map(v => convertValueToJson(v));
}
