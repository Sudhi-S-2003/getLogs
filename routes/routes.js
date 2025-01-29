const express = require("express");
const router =express.Router();
const ValidatorController=require('../controllers/ValidatorController')

router.post('/',ValidatorController)



module.exports =router;
