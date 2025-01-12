const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const reconStatusController = async (req, res) => {
  try {
    const { context, message } = req.body;
    const baseUrl = "https://pramaan.ondc.org/beta/preprod/mock/seller";
    const subUrl = req.body.context.action;

    const data = {
      context: {
        ...context,
        timestamp: new Date().toISOString(),
        transaction_id:'972acef3-d36f-4102-b644-3b3fb5406cd6',
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
    }

    const response = await axios.post(`${baseUrl}/${subUrl}`, data);
    
    // Only return the data portion of the Axios response
    res.status(200).json({response:response.data,data:data});
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = reconStatusController;
