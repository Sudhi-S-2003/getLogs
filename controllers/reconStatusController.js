const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { createAuthorizationHeader } = require(".");

let transaction_ids = [];

const reconStatusController = async (req, res) => {
  try {
    const { context, message } = req.body;
    const baseUrl = "https://pramaan.ondc.org/beta/preprod/mock/seller";
    const subUrl = req.body.context.action;

    const data = {
      context: {
        ...context,
        timestamp: new Date().toISOString(),
        message_id: uuidv4(),
        bap_id: "ondc.eatiko.com",
        bap_uri: "https://ondc.eatiko.com/ondc-PREPROD",
      },
      message: message,
    };

    if (context.action !== "search") {
      data.context.bpp_id = "pramaan.ondc.org/beta/preprod/mock/seller";
      data.context.bpp_uri =
        "https://pramaan.ondc.org/beta/preprod/mock/seller";
      data.context.transaction_id = uuidv4();
    }

    if (context.action !== "select") {
      data.context.transaction_id = uuidv4();
      transaction_ids.push(data.context.transaction_id);
    } else if (context.action !== "search") {
      data.context.transaction_id = transaction_ids[transaction_ids.length - 1];
    }
    const authorizationHeader = await createAuthorizationHeader(data);

    const response = await axios.post(`${baseUrl}/${subUrl}`, data,{
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
        "X-Gateway-Authorization": authorizationHeader,
      },
    });

    // Return only the data portion of the Axios response
    res.status(200).json({ response: response.data, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = reconStatusController;
