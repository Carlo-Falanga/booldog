const express = require('express')
const router = express.Router()
const productController = require("../controllers/productController")



router.get("/", productController.index)

router.get("/animal/:animalType", productController.indexAnimalType)

router.get("/:slug", productController.show)

module.exports = router