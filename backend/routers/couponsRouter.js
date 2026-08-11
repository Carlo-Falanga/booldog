const express = require('express')
const router = express.Router()
const couponController = require("../controllers/couponController")



router.post("/", couponController.validate)



module.exports = router