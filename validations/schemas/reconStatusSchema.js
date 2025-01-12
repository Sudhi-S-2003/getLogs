const reconStatusSchema = {
    type: "object",
    properties: {
      context: {
        type: "object",
        properties: {
          domain: { type: "string" },
          country: { type: "string" },
          city: { type: "string" },
          action: { type: "string" },
          core_version: { type: "string" },
          bap_id: { type: "string" },
          bap_uri: { type: "string", format: "uri" },
          bpp_id: { type: "string" },
          bpp_uri: { type: "string", format: "uri" },
          transaction_id: { type: "string", format: "uuid" },
          message_id: { type: "string", format: "uuid" },
          timestamp: { type: "string", format: "date-time" },
          key: { type: ["string", "null"] },
          ttl: { type: "string", pattern: "^P\\d+D$" }
        },
        required: [
          "domain",
          "country",
          "city",
          "action",
          "core_version",
          "bap_id",
          "bap_uri",
          "bpp_id",
          "bpp_uri",
          "transaction_id",
          "message_id",
          "timestamp",
          "ttl"
        ]
      },
      message: {
        type: "object",
        properties: {
          reconstatus: {
            type: "object",
            properties: {
              transaction_id: { type: "string", format: "uuid" }
            },
            required: ["transaction_id"]
          }
        },
        required: ["reconstatus"]
      }
    },
    required: ["context", "message"]
  };
  
  module.exports = reconStatusSchema;
  