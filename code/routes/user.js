
const path = require('path');
const express = require('express');

const userCon = require('../controllers/user');

const router = express.Router();

router.get('/',userCon.loadhome);
router.get('/register',userCon.createUser);

module.exports = router;