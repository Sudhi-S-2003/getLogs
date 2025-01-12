const express = require("express");
const router =express.Router();
const reconStatus=require('../controllers/reconStatusController')

router.post('/',reconStatus)



module.exports =router;
