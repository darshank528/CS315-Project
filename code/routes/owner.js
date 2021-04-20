
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');

const router = express.Router();

router.get('/',ownerCon.loadhome);
router.get('/register',ownerCon.createOwner);
router.get('/',ownerCon.ShowEmployeeInformation);
router.get('/',ownerCon.AllotOrderToWaiter);
router.get('/',ownerCon.AllotOrderToChef);
router.get('/',ownerCon.Analytics);
router.get('/',ownerCon.OrderHistory);
router.get('/',ownerCon.UpdateInventory);

module.exports = router;