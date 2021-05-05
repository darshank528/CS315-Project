
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const emp_maCon = require('../controllers/owner');

const router = express.Router();

router.post('/',emp_maCon.UpdateEmpl);
router.get('/',emp_maCon.Add_Empl);

// post - how to have multiple ?

module.exports = router;