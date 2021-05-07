
const path = require('path');
const express = require('express');

const user_con = require('../controllers/user');

const router = express.Router();

router.get('/',user_con.user_prof_get);

module.exports = router;