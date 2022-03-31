const path = require("path");
const express = require("express");

const employeeCon = require("../controllers/employee");

const router = express.Router();

router.get("/", employeeCon.loadhome);
router.get("/register", employeeCon.createEmployee);
router.get("/", employeeCon.GetProfile);
router.post("/payment", employeeCon.paymentPage);
router.post("/payment/confirm", employeeCon.makePayment);
router.post("/", employeeCon.CookOrServeDish);
module.exports = router;
