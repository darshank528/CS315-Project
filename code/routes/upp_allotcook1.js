
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const uppallotcook1 = require('../controllers/owner');

const router = express.Router();

router.post('/',uppallotcook1.uppallotcook1_post);
router.get('/',uppallotcook1.upallotcook1_get);

// post - how to have multiple ?

module.exports = router;