
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const invCon = require('../controllers/owner');

const router = express.Router();

router.get('/',ownerCon.loadhome);
router.get('/register',ownerCon.createOwner);
router.get('/',ownerCon.ShowEmployeeInformation);
router.get('/',ownerCon.AllotOrderToWaiter);
router.get('/',ownerCon.AllotOrderToChef);
router.get('/',ownerCon.Analytics);
router.get('/',ownerCon.OrderHistory);
router.post('/',ownerCon.UpdateInventory);
router.post('/',invCon.UpdateInventory);
router.get('/',invCon.Add_Inv);

// post - how to have multiple ?

module.exports = router;