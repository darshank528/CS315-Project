
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const inc_env = require('../controllers/owner');

const router = express.Router();

router.post('/',inc_env.incinv_post);
//router.get('/',uppemp.delemp_get);

// post - how to have multiple ?

module.exports = router;