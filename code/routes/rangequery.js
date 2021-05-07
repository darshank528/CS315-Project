const path = require('path');
const express = require('express');

const ownerCon = require('../controllers/owner');
const invCon = require('../controllers/owner');

const router = express.Router();

router.post('/',ownerCon.OrderRangeInfo);