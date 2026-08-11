const express = require('express')
const router = express.Router()
const orderController = require("../controllers/orderController")
const { storeOrderValidation } = require("../validators/orderValidator")

router.get("/:id", orderController.show)

router.post("/", storeOrderValidation, orderController.store )

module.exports = router