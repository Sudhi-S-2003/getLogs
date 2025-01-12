const on_settleSchema = {
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
          transaction_id: { type: "string" },
          ttl: { type: "string" },
          message_id: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
          bpp_id: { type: "string" },
          bpp_uri: { type: "string", format: "uri" }
        },
        required: [
          "domain",
          "country",
          "city",
          "action",
          "core_version",
          "bap_id",
          "bap_uri",
          "transaction_id",
          "ttl",
          "message_id",
          "timestamp",
          "bpp_id",
          "bpp_uri"
        ]
      },
      message: {
        type: "object",
        properties: {
          settlement: {
            type: "object",
            properties: {
              settlements: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    curr_type: { type: "string" },
                    amount: {
                      type: "object",
                      properties: {
                        currency: { type: "string" },
                        value: { type: "string" }
                      },
                      required: ["currency", "value"]
                    },
                    settlement_id: { type: "string" },
                    state: { type: "string" },
                    settlement_reference_no: { type: "string" }
                  },
                  required: [
                    "curr_type",
                    "amount",
                    "settlement_id",
                    "state",
                    "settlement_reference_no"
                  ]
                }
              }
            },
            required: ["settlements"]
          }
        },
        required: ["settlement"]
      }
    },
    required: ["context", "message"]
  };
  
  module.exports = on_settleSchema;
  