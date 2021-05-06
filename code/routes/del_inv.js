
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const uppemp = require('../controllers/owner');

const router = express.Router();

router.post('/',uppemp.delinv_post);
//router.get('/',uppemp.delemp_get);

// post - how to have multiple ?

module.exports = router;