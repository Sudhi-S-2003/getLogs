const axios = require("axios");

const sendPostRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data; 
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
    throw error; 
  }
};



module.exports = { sendPostRequest };
