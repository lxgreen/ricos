import contentStateSchema from '../../statics/schemas/content-state.schema.json';

type Schema = import('jsonschema').Schema;
type ValidatorResult = import('jsonschema').ValidatorResult;

export const checkValidity = (data: Record<string, unknown>, schema: Schema): ValidatorResult => {
  const Validator = require('jsonschema').Validator;
  return new Validator().validate(data, schema);
};

export const validate = (
  data: Record<string, unknown>,
  schema: Schema,
  shouldValidate?: boolean
) => {
  if (process.env.NODE_ENV !== 'production' || shouldValidate) {
    const result = checkValidity(data, schema);
    if (!result.valid && result.errors) {
      result.errors.forEach(error => console.warn('schema validation error:', error)); // eslint-disable-line no-console
    }
    return result.valid;
  } else {
    return true;
  }
};

export const getContentStateSchema = (
  pluginDataSchemas: { [pluginType: string]: Schema } = {}
): Schema => {
  const schema = contentStateSchema;
  schema.definitions.entityDef.anyOf = Object.keys(pluginDataSchemas).map(pluginType => {
    return {
      properties: {
        type: { const: pluginType },
        data: pluginDataSchemas[pluginType],
      },
    };
  });

  return schema;
};
