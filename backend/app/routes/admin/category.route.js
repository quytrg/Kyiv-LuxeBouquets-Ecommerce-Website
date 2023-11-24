const express = require('express')
const router = express.Router()

const categoryController = require('../../controllers/admin/category.controller')

router.get('/', categoryController.find)
// router.get('/:slug', categoryController.find)

module.exports = router