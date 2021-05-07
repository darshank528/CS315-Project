const path = require('path');
const express = require('express');

const analCon1 = require('../controllers/owner');

const router = express.Router();

router.post('/',analCon1.dispReport1);


module.exports = router;