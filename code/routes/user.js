const path = require("path");
const express = require("express");
const https = require("https");

const userCon = require("../controllers/user");
const { request } = require("http");

const router = express.Router();

router.get("/", userCon.loadhome);
router.get("/register", userCon.createUser);
router.get("/login", userCon.loginPage);
router.post("/login", userCon.login);
router.post("/filter", userCon.loadhome2);
router.post("/order", userCon.PlaceOrder);
router.get("/logout", userCon.logout);
router.post("/review", userCon.review);
module.exports = router;
