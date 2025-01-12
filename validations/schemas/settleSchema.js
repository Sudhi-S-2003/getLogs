
  const settleSchema= {
    type: "object",
    properties: {
      context: {
        type: "object",
        properties: {
          domain: { type: "string" },
          country: { type: "string", pattern: "^[A-Z]{3}$" },
          city: { type: "string" },
          action: { type: "string", enum: ["settle"] },
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
          settlement: {
            type: "object",
            properties: {
              settlements: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    collector_app_id: { type: "string" },
                    receiver_app_id: { type: "string" },
                    payer_name: { type: "string" },
                    payer_address: { type: "string" },
                    payer_account_no: { type: "number" },
                    payer_bank_code: { type: "string" },
                    payer_virtual_payment_address: { type: "string" },
                    curr_type: { type: "string", enum: ["INR"] },
                    amount: {
                      type: "object",
                      properties: {
                        currency: { type: "string", enum: ["INR"] },
                        value: { type: "string" }
                      },
                      required: ["currency", "value"]
                    },
                    timestamp: { type: "string", format: "date-time" },
                    payee_name: { type: "string" },
                    payee_address: { type: "string" },
                    payee_account_no: { type: "string" },
                    payee_bank_code: { type: "string" },
                    payee_virtual_payment_address: { type: "string" },
                    payment_type: { type: "string" },
                    purpose_code: { type: "string" },
                    payee_account_type: { type: "string" },
                    remarks: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        code: { type: "string" }
                      },
                      required: ["name"]
                    },
                    settlement_id: { type: "string" },
                    state: { type: ["string", "null"] },
                    prev_settlement_reference_no: {
                      type: "array",
                      items: { type: "string" }
                    },
                    settlement_reference_no: { type: ["string", "null"] },
                    error_code: { type: ["string", "null"] },
                    error_message: { type: ["string", "null"] }
                  },
                  required: [
                    "collector_app_id",
                    "receiver_app_id",
                    "payer_name",
                    "payer_address",
                    "payer_account_no",
                    "payer_bank_code",
                    "payer_virtual_payment_address",
                    "curr_type",
                    "amount",
                    "timestamp",
                    "payee_name",
                    "payee_address",
                    "payee_account_no",
                    "payee_bank_code",
                    // "payee_virtual_payment_address",
                    "payment_type",
                    "purpose_code",
                    "payee_account_type",
                    "remarks",
                    "settlement_id",
                    // "prev_settlement_reference_no"
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
  
  module.exports = settleSchema
  