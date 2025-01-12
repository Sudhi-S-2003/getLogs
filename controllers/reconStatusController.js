const validateSchema = require("../validations/schemaValidation");
const reconStatusSchema = require("../validations/schemas/reconStatusSchema");
const collectorModel = require("../models/collectorModel");
const { sendPostRequest } = require("../Utility/apiUtils");
const reconStatusController = async (req, res) => {
  try {
    const { context, message } = req.body;

    // Schema Validation
    const { valid, errors } = validateSchema(req.body, reconStatusSchema);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Retrieve collector data
    const collectorData = await collectorModel.findOne({
      "context.transaction_id": context.transaction_id,
    });

    if (!collectorData) {
      return res.status(400).json({
        message: {
          ack: {
            status: "NACK",
          },
        },
        error: {
          code: "01",
          path: "string",
          message: "No Transaction found",
        },
      });
    }

    const data = {
      context: {
        ...context,
        action: "on_recon_status",
        timestamp: new Date().toISOString(),
      },
      message: {
        orderbook: {
          orders: collectorData.message.orderbook.orders.map((order) => ({
            id: order.id,
            invoice_no: order.invoice_no,
            collector_app_id: order.collector_app_id,
            receiver_app_id: order.receiver_app_id,
            order_recon_status: order.order_recon_status,
            transaction_id: order.transaction_id,
            settlement_id: order.settlement_id,
            settlement_reference_no: order.settlement_reference_no,
            recon_status: order.recon_status,
            diff_amount: order.diff_amount,
            counterparty_recon_status: order.counterparty_recon_status,
            counterparty_diff_amount: order.counterparty_diff_amount,
            message: order.message,
          })),
        },
      },
    };
    const apiResponse = await sendPostRequest(
      `${context.bpp_uri}/on_recon_status`,
      data
    );
    return res.status(200).json(apiResponse);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = reconStatusController;
