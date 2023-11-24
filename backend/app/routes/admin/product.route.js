const express = require('express')
const router = express.Router()

const productController = require('../../controllers/admin/product.controller')

router.patch('/change-status/:id', productController.updateOne)
router.patch('/change-multi', productController.updateMany)
router.post('/create', productController.create)
router.put('/update/:id', productController.updateOne)
router.get('/:slug', productController.findOne)
router.delete('/:id', productController.deleteOne)
router.get('/', productController.find)

module.exports = router