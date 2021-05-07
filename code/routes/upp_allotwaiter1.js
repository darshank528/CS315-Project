
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const uppallotwaiter1 = require('../controllers/owner');

const router = express.Router();

router.post('/',uppallotwaiter1.uppallotwaiter1_post);
router.get('/',uppallotwaiter1.upallotwaiter1_get);

// post - how to have multiple ?

module.exports = router;