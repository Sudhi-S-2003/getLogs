const express = require("express");
const router =express.Router();
const collectorReconController = require('../controllers/collector_recon');
const settleController =require('../controllers/settleController');
const receiverRecon =require('../controllers/receiverReconController');
const onSettle =require('../controllers/onsettleController');
const onReceiverRecon =require('../controllers/onRecevierReconController');
const onCollectorRecon = require('../controllers/onCollectorRecon');
const reconStatus=require('../controllers/reconStatusController')

router.post('/collector_recon',collectorReconController); 
router.post('/settle',settleController);
router.post('/on_settle',onSettle)
router.post('/receiver_recon',receiverRecon);
router.post('/on_receiver_recon',onReceiverRecon);
router.post('/on_collector_recon',onCollectorRecon);
router.post('/recon_status',reconStatus)



module.exports =router;
