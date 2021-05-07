
const path = require('path');
const express = require('express');
const https = require('https')

const userCon = require('../controllers/user');
const { request } = require('http');

const router = express.Router();

router.get('/',userCon.loadhome);
router.get('/register',userCon.createUser);
router.get('/login',userCon.loginPage);
router.post('/login',userCon.login);
router.post('/',userCon.loadhome);
router.post("/order",userCon.PlaceOrder);
module.exports = router;