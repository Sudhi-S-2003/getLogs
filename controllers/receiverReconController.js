const validateSchema = require("../validations/schemaValidation");
const receiverReconSchema = require("../validations/schemas/receiverreconScheama");
const onreceiverReconScheama = require("../validations/schemas/onreceiverReconShema");
const { sendPostRequest } = require("../Utility/apiUtils");

const receiverRecon = async (req, res) => {
  try {
    const { context, message } = req.body;
    const { valid, errors } = validateSchema(req.body, receiverReconSchema);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const orders = message.orderbook.orders.map((obj) => {
      return {
        id: obj.id,
        invoice_no: obj?.invoice_no,
        collector_app_id: obj?.collector_app_id,
        receiver_app_id: obj?.receiver_app_id,
        order_recon_status: obj?.order_recon_status,
        transaction_id: obj?.transaction_id,
        settlement_id: obj?.settlement_id,
        settlement_reference_no: obj?.settlement_reference_no,
        counterparty_recon_status: obj?.counterparty_recon_status,
        recon_status: obj.recon_status,
        diff_amount: {
          currency: obj?.diff_amount?.currency,
          value: obj?.diff_amount?.value,
        },
        counterparty_diff_amount: {
          currency: obj?.counterparty_diff_amount?.currency,
          value: obj?.counterparty_diff_amount?.value,
        },
        message: obj?.message,
      };
    });

    const data = {
      context: {
        ...context,
        action: "on_receiver_recon",
        timestamp: new Date().toISOString(),
      },
      message: { orderbook: { orders: orders } },
    };


    const { valid: onreceiverReconSchema, errors: onreceiverReconErros } =
      validateSchema(data, onreceiverReconScheama);
    if (!onreceiverReconSchema) {
      return res.status(400).json({
        errors: onreceiverReconErros,
      });
    }
    
 
    const apiResponse = await sendPostRequest(`${context.bpp_uri}/on_receiver_recon`, data);
    return res.status(200).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
module.exports = receiverRecon;
