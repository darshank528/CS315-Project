const path = require('path');
const express = require('express');

const rangeCon = require('../controllers/owner');

const router = express.Router();

router.post('/',rangeCon.RestRangeInfo);


module.exports = router;