const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true }); // Enable detailed error reporting
require("ajv-formats")(ajv); // Add format support (e.g., for date-time validation)

const validateSchema = (data, schema) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    return { 
      valid: false, 
      errors: {
        message: {
          ack: {
            status: "NACK",
          },
        },
        error: {
          code: "70014",
          path: "string",
          message: validate.errors,
        },
      },
    }; // Return errors with result
  }

  return { valid: true, errors: [] }; // Return valid response when no errors
};

module.exports = validateSchema;
