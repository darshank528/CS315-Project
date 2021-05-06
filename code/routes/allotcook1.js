
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const allotcook1 = require('../controllers/owner');

const router = express.Router();

router.post('/',allotcook1.allotcook1_post);
router.get('/',allotcook1.allotcook1_get);

// post - how to have multiple ?

module.exports = router;