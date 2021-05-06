
const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const upemp = require('../controllers/owner');

const router = express.Router();

router.post('/',upemp.upemp_post);
router.get('/',upemp.upemp_get);

// post - how to have multiple ?

module.exports = router;