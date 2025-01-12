const validateSchema = require("../validations/schemaValidation");
const onCollectorReconSchema = require("../validations/schemas/onCollectorReconScheama")

const onCollectorRecon =async(req,res)=>{

   try{
    const { context, message } = req.body;
    const { valid, errors } = validateSchema(req.body,onCollectorReconSchema);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
    
    return res.status(200).json({
      message: {
        ack: {
          status: "ACK",
        },
      },
    });
    
   }catch(error){
    return res.status(500).json({ error: error.message || "Internal Server Error" });
   }
}
module.exports = onCollectorRecon;