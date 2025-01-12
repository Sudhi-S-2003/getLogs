const onSettleSchema = require("../validations/schemas/on_settleSchema");
const collectorModel = require("../models/collectorModel");
const validateSchema = require("../validations/schemaValidation");
const receiverReconSchema = require("../validations/schemas/receiverreconScheama");
const { default: axios } = require("axios");
const { response } = require("express");
const { sendPostRequest } = require("../Utility/apiUtils");
const onSettle = async (req, res) => {
  try {
    const { context, message } = req.body;
    const { valid, errors } = validateSchema(req.body, onSettleSchema);
    if (!valid) {
      return res.status(400).json({
        errors: errors,
      });
    }

    const collectorData = await collectorModel.findOne({
      "context.transaction_id": context.transaction_id,
    });

    if (!collectorData) {
      return res.status(400).json({ message: "data not found" });
    }

    const data = {
      context: {
        ...collectorData.context,
        timestamp: new Date().toISOString(),
        action: "receiver_recon",
      },
      message: collectorData.message,
    };

    const {
      valid: receiverReconSchemaValid,
      errors: receiverReconSchemaError,
    } = validateSchema(data, receiverReconSchema);
    if (!receiverReconSchemaValid) {
      return res.status(400).json({ errors: receiverReconSchemaError });
    }
    const apiResponse = await sendPostRequest(`${context.bpp_uri}/receiver_recon`, data);
    return res.status(200).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = onSettle;
