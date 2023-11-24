const ApiError = require('../../middlewares/api-error.js')
const ProductService = require('../../services/client/product.service.js')

// [GET] /products
module.exports.findAll = async (req, res, next) => {
    try {
        const filter = {
            deleted: false,
            status: 'active'
        }
        const productService = new ProductService()
        const products = await productService.find(filter)
        return res.send(products)
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while retrieving the products")
        )
    }
}

// [GET] /products/:category
module.exports.findCategory = async (req, res, next) => {
    try {
        const { category } = req.params
        const filter = {
            category,
            deleted: false,
            status: 'active'
        }

        const productService = new ProductService()
        const products = await productService.find(filter)
        return res.send(products)
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while retrieving the products")
        )
    }
}

// [GET] /products/product-detail/:slug
module.exports.findOne = async (req, res, next) => {
    try {
        const { slug } = req.params
       
        const productService = new ProductService()
        const product = await productService.findBySlug(slug)
        return res.send(product)
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while retrieving the products")
        )
    }
}
