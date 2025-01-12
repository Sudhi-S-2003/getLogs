

const collectorReconSchema = {
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: { type: "string" },
        country: { type: "string", pattern: "^[A-Z]{3}$" },
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
        orderbook: {
          type: "object",
          properties: {
            orders: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  invoice_no: { type: "string" },
                  collector_app_id: { type: "string" },
                  receiver_app_id: { type: "string" },
                  receiver_app_uri: { type: "string", format: "uri" },
                  state: { type: "string" },
                  provider: {
                    type: "object",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          code: { type: "string" }
                        },
                        required: ["name", "code"]
                      },
                      address: { type: "string" }
                    },
                    required: ["name", "address"]
                  },
                  payment: {
                    type: "object",
                    properties: {
                      uri: { type: "string" },
                      tl_method: { type: "string" },
                      params: {
                        type: "object",
                        properties: {
                          transaction_id: { type: "string" },
                          transaction_status: { type: "string" },
                          amount: { type: "string" },
                          currency: { type: "string" }
                        },
                        required: ["transaction_id", "transaction_status", "amount", "currency"]
                      },
                      type: { type: "string" },
                      status: { type: "string" }
                    },
                    required: ["uri", "tl_method", "params", "type", "status"]
                  },
                  withholding_tax_gst: {
                    type: "object",
                    properties: {
                      currency: { type: "string" },
                      value: { type: "string" }
                    },
                    required: ["currency", "value"]
                  },
                  payerdetails: {
                    type: "object",
                    properties: {
                      payer_name: { type: "string" },
                      payer_address: { type: "string" },
                      payer_account_no: { type: "number" },
                      payer_bank_code: { type: "string" },
                      payer_virtual_payment_address: { type: "string" }
                    },
                    required: [
                      "payer_name",
                      "payer_address",
                      "payer_account_no",
                      "payer_bank_code",
                      "payer_virtual_payment_address"
                    ]
                  }
                },
                required: [
                  "id",
                  "invoice_no",
                  "collector_app_id",
                  "state",
                  "provider",
                  "payment"
                ]
              }
            }
          },
          required: ["orders"]
        }
      },
      required: ["orderbook"]
    }
  },
  required: ["context", "message"]
};


module.exports = collectorReconSchema;
