
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const allotwaiter1 = require('../controllers/owner');

const router = express.Router();

router.post('/',allotwaiter1.allotwaiter1_post);
router.get('/',allotwaiter1.allotwaiter1_get);

// post - how to have multiple ?

module.exports = router;