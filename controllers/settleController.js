const settleSchema = require("../validations/schemas/settleSchema");
const validateSchema = require("../validations/schemaValidation");
const onSettleSchema = require("../validations/schemas/on_settleSchema");
const { sendPostRequest } = require("../Utility/apiUtils");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const settle = async (req, res) => {
  try {
    const { context, message } = req.body;

    const { valid, errors } = validateSchema(req.body, settleSchema);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const settlements = message.settlement.settlements.map((obj) => ({
      curr_type: obj.amount.currency,
      amount: obj.amount,
      settlement_id: obj.settlement_id,
      state: "01",
      settlement_reference_no: uuidv4(),
    }));

    const data = {
      context: {
        ...context,
        action: "on_settle",
        timestamp: new Date().toISOString(),
      },
      message: { settlement: { settlements } },
    };

    const { valid: onSettleValid, errors: onSettleErrors } = validateSchema(
      data,
      onSettleSchema
    );
    if (!onSettleValid) {
      return res.status(400).json({
        errors: onSettleErrors,
      });
    }
    const apiResponse = await sendPostRequest(`${context.bpp_uri}/on_settle`, data);
    return res.status(200).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = settle;
