

// const  receiverReconScheama = {
//     type: "object",
//     properties: {
//       context: {
//         type: "object",
//         properties: {
//           domain: { type: "string" },
//           country: { type: "string" },
//           city: { type: "string" },
//           action: { type: "string" },
//           core_version: { type: "string" },
//           bap_id: { type: "string" },
//           bap_uri: { type: "string" },
//           bpp_id: { type: "string" },
//           bpp_uri: { type: "string" },
//           transaction_id: { type: "string" },
//           message_id: { type: "string" },
//           timestamp: { type: "string", format: "date-time" },
//           key: { type: ["string", "null"] },
//           ttl: { type: "string" }
//         },
//         required: [
//           "domain",
//           "country",
//           "city",
//           "action",
//           "core_version",
//           "bap_id",
//           "bap_uri",
//           "bpp_id",
//           "bpp_uri",
//           "transaction_id",
//           "message_id",
//           "timestamp",
//           "ttl"
//         ]
//       },
//       message: {
//         type: "object",
//         properties: {
//           orderbook: {
//             type: "object",
//             properties: {
//               orders: {
//                 type: "array",
//                 items: {
//                   type: "object",
//                   properties: {
//                     id: { type: "string" },
//                     invoice_no: { type: "string" },
//                     collector_app_id: { type: "string" },
//                     receiver_app_id: { type: "string" },
//                     receiver_app_uri: { type: "string" },
//                     state: { type: "string" },
//                     provider: {
//                       type: "object",
//                       properties: {
//                         name: {
//                           type: "object",
//                           properties: {
//                             name: { type: "string" },
//                             code: { type: "string" }
//                           },
//                           required: ["name", "code"]
//                         },
//                         address: { type: "string" }
//                       },
//                       required: ["name", "address"]
//                     },
//                     payment: {
//                       type: "object",
//                       properties: {
//                         uri: { type: "string" },
//                         tl_method: { type: "string" },
//                         params: {
//                           type: "object",
//                           properties: {
//                             transaction_id: { type: "string" },
//                             transaction_status: { type: "string" },
//                             amount: { type: "string" },
//                             currency: { type: "string" }
//                           },
//                           required: [
//                             "transaction_id",
//                             "transaction_status",
//                             "amount",
//                             "currency"
//                           ]
//                         },
//                         type: { type: "string" },
//                         status: { type: "string" },
//                         "@ondc/org/collected_by_status": { type: "string" },
//                         "@ondc/org/buyer_app_finder_fee_type": { type: "string" },
//                         "@ondc/org/buyer_app_finder_fee_amount": { type: "string" },
//                         "@ondc/org/withholding_amount": { type: "string" },
//                         "@ondc/org/withholding_amount_status": { type: "string" },
//                         "@ondc/org/return_window": { type: "string" },
//                         "@ondc/org/return_window_status": { type: "string" },
//                         "@ondc/org/settlement_basis": { type: "string" },
//                         "@ondc/org/settlement_basis_status": { type: "string" },
//                         "@ondc/org/settlement_window": { type: "string" },
//                         "@ondc/org/settlement_window_status": { type: "string" },
//                         "@ondc/org/settlement_details": {
//                           type: "array",
//                           items: {
//                             type: "object",
//                             properties: {
//                               settlement_counterparty: { type: "string" },
//                               settlement_phase: { type: "string" },
//                               settlement_amount: { type: "number" },
//                               settlement_type: { type: "string" },
//                               settlement_bank_account_no: { type: "string" },
//                               settlement_ifsc_code: { type: "string" },
//                               upi_address: { type: "string" },
//                               bank_name: { type: "string" },
//                               branch_name: { type: "string" },
//                               beneficiary_name: { type: "string" },
//                               beneficiary_address: { type: "string" },
//                               settlement_status: { type: "string" },
//                               settlement_reference: { type: "string" },
//                               settlement_timestamp: { type: "string", format: "date-time" }
//                             },
//                             required: [
//                               "settlement_counterparty",
//                               "settlement_phase",
//                               "settlement_amount",
//                               "settlement_type",
//                               "settlement_bank_account_no",
//                               "settlement_ifsc_code",
//                               "settlement_status",
//                               "settlement_timestamp"
//                             ]
//                           }
//                         }
//                       },
//                       required: ["uri", "tl_method", "params", "type", "status"]
//                     },
//                     withholding_tax_gst: {
//                       type: "object",
//                       properties: {
//                         currency: { type: "string" },
//                         value: { type: "string" }
//                       },
//                       required: ["currency", "value"]
//                     },
//                     withholding_tax_tds: {
//                       type: "object",
//                       properties: {
//                         currency: { type: "string" },
//                         value: { type: "string" }
//                       },
//                       required: ["currency", "value"]
//                     },
//                     deduction_by_collector: {
//                       type: "object",
//                       properties: {
//                         currency: { type: "string" },
//                         value: { type: "string" }
//                       },
//                       required: ["currency", "value"]
//                     },
//                     payerdetails: {
//                       type: "object",
//                       properties: {
//                         payer_name: { type: "string" },
//                         payer_address: { type: "string" },
//                         payer_account_no: { type: "string" },
//                         payer_bank_code: { type: "string" },
//                         payer_virtual_payment_address: { type: "string" }
//                       },
//                       required: [
//                         "payer_name",
//                         "payer_address",
//                         "payer_account_no",
//                         "payer_bank_code"
//                       ]
//                     },
//                     settlement_reason_code: { type: "string" },
//                     transaction_id: { type: "string" },
//                     settlement_id: { type: "string" },
//                     settlement_reference_no: { type: "string" },
//                     recon_status: { type: "string" },
//                     message: {
//                       type: "object",
//                       properties: {
//                         name: { type: "string" },
//                         code: { type: "string" }
//                       },
//                       required: ["name", "code"]
//                     },
//                     created_at: { type: "string", format: "date-time" },
//                     updated_at: { type: "string", format: "date-time" }
//                   },
//                   required: [
//                     "id",
//                     "invoice_no",
//                     "collector_app_id",
//                     "receiver_app_id",
//                     "state",
//                     "provider",
//                     "payment",
//                     "payerdetails",
//                     "transaction_id",
//                     "created_at"
//                   ]
//                 }
//               }
//             },
//             required: ["orders"]
//           }
//         },
//         required: ["orderbook"]
//       }
//     },
//     required: ["context", "message"]
//   };
  
const  receiverReconScheama  = {
    $schema: "http://json-schema.org/draft-07/schema#",
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
          bap_uri: { type: "string" },
          bpp_id: { type: "string" },
          bpp_uri: { type: "string" },
          transaction_id: { type: "string" },
          message_id: { type: "string" },
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
                    state: { type: "string" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" }
                  },
                  required: ["id", "state", "created_at", "updated_at"]
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
  
  
module.exports = receiverReconScheama;