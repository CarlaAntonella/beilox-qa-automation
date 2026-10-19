import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

export interface SchemaValidation {
  valid: boolean;
  errors: string[];
}

export function validateSchema(schema: object, data: unknown): SchemaValidation {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  return {
    valid,
    errors: (validate.errors ?? []).map(
      (error) => `${error.instancePath || '/'} ${error.message ?? 'schema mismatch'}`
    )
  };
}
