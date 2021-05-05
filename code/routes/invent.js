
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const invCon = require('../controllers/owner');

const router = express.Router();

router.post('/',invCon.UpdateInventory);
router.get('/',invCon.Add_Inv);

// post - how to have multiple ?

module.exports = router;