const validateSchema = require("../validations/schemaValidation");
const collectorReconSchema = require("../validations/schemas/collectorReconSchema");
const settleSchema = require("../validations/schemas/settleSchema");
const { sendPostRequest } = require("../Utility/apiUtils");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const collectorModel = require("../models/collectorModel");

const collectorRecon = async (req, res) => {
  try {
    const { valid, errors } = validateSchema(req.body, collectorReconSchema);
    const { context, message } = req.body;
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
    const collectorData = await collectorModel.findOne({
      "context.transaction_id": context.transaction_id,
    });

    if (!collectorData) {
      const newData = new collectorModel({
        context: context,
        message: message,
      });
      await newData.save();
    }

    const settlements = message.orderbook.orders.flatMap((obj) => {
      const collector_app_id = obj.collector_app_id;
      const receiver_app_id = obj.receiver_app_id;
      const payer_name = obj.payerdetails?.payer_name;
      const payer_address = obj.payerdetails?.payer_address;
      const payer_account_no = obj.payerdetails?.payer_account_no;
      const payer_bank_code = obj.payerdetails?.payer_bank_code;
      const payer_virtual_payment_address =
        obj.payerdetails?.payer_virtual_payment_address;

      return obj.payment["@ondc/org/settlement_details"].map((settleObj) => ({
        collector_app_id: collector_app_id,
        receiver_app_id: receiver_app_id,
        payer_name: payer_name,
        payer_address: payer_address,
        payer_account_no: payer_account_no,
        payer_bank_code: payer_bank_code,
        payer_virtual_payment_address: payer_virtual_payment_address,
        curr_type: "INR",
        amount: {
          currency: "INR",
          value: settleObj.settlement_amount.toString(),
        },
        timestamp: new Date().toISOString(),
        payee_name: settleObj.beneficiary_name,
        payee_address: settleObj.beneficiary_address,
        payee_account_no: settleObj.settlement_bank_account_no,
        payee_bank_code: settleObj.settlement_ifsc_code,
        payment_type: "02",
        purpose_code: "02",
        payee_account_type: "01",
        remarks: {
          name: "NA",
        },
        settlement_id: uuidv4(),
      }));
    });

    const data = {
      context: {
        ...context,
        action: "settle",
        timestamp: new Date().toISOString(),
      },
      message: {
        settlement: {
          settlements: settlements,
        },
      },
    };

    const { valid: settleValid, errors: settleErrors } = validateSchema(
      data,
      settleSchema
    );
    if (!settleValid) {
      return res.status(400).json({
        errors: settleErrors,
      });
    }
    const apiResponse = await sendPostRequest(`${context.bpp_uri}/settle`, data);
    return res.status(200).json(apiResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = collectorRecon;
