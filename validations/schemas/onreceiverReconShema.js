
const onreceiverReconScheama  = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: { type: "string" },
        country: { type: "string" },
        city: { type: "string" },
        action: { type: "string", enum: ["on_receiver_recon"] },
        core_version: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string", format: "uri" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string", format: "uri" },
        transaction_id: { type: "string", format: "uuid" },
        message_id: { type: "string", format: "uuid" },
        timestamp: { type: "string", format: "date-time" },
        key: { type: ["string", "null"] },
        ttl: { type: "string" }
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
                  order_recon_status: { type: "string"},
                  transaction_id: { type: "string", format: "uuid" },
                  settlement_id: { type: "string" },
                  settlement_reference_no: { type: "string" },
                  recon_status: { type: "string",},
                  diff_amount: {
                    type: "object",
                    properties: {
                      currency: { type: "string" },
                      value: { type: ["number", "null"] }
                    },
                    // required: ["currency", "value"]
                  },
                  counterparty_recon_status: { type: "string",},
                  counterparty_diff_amount: {
                    type: "object",
                    properties: {
                      currency: { type: "string" },
                      value: { type: "number" }
                    },
                    // required: ["currency", "value"]
                  },
                  message: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      code: { type: "string" }
                    },
                    // required: ["name", "code"]
                  }
                },
                required: [
                  "id",
                  "invoice_no",
                  "collector_app_id",
                  "receiver_app_id",
                  "order_recon_status",
                  "transaction_id",
                  "settlement_id",
                  "settlement_reference_no",
                  "recon_status",
                  "diff_amount",
                  "counterparty_recon_status",
                  "counterparty_diff_amount",
                  "message"
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


module.exports = onreceiverReconScheama;
