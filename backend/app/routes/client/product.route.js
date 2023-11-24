const express = require('express')
const router = express.Router()

const productController = require('../../controllers/client/product.controller')

router.get('/product-detail/:slug', productController.findOne)
router.get('/:category', productController.findCategory)
router.get('/', productController.findAll)

module.exports = router