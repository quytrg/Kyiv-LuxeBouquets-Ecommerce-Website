const ApiError = require('../../middlewares/api-error.js')
const ProductService = require('../../services/admin/product.service.js')
const searchHelper = require('../../helpers/search.helper.js')

// [GET] /products
module.exports.find = async (req, res, next) => {
    try {
        const filter = { 
            deleted: false,
        }
        if (req.query.status) {
            filter.status = req.query.status
        }
        if (req.query.category) {
            filter.category = req.query.category
        }
        if (req.query.keyword) {
            const searchObj = searchHelper(req.query)
            filter.title = searchObj.regex
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

// [PATCH] /products/change-status/:id
module.exports.updateOne = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data update cannot be empty"))
    }

    try {
        const productService = new ProductService()
        
        const document = await productService.updateOne(req.params.id, req.body)
        
        if (!document) {
            return next(new ApiError(404, "Product not found"))
        }

        res.send({
            message: "Product was updated successfully",
            updatedDocument: document
        })
    }
    catch (err) {
        return next(
            new ApiError(500, `Error retrieving product with id: ${req.params.id}`)
        )
    }
}

// [PATCH] /products/change-multi
module.exports.updateMany = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data update cannot be empty"))
    }

    try {
        const productService = new ProductService()

        const { idList, type } = req.body

        let document = {}

        switch (type) {
            case 'active':
            case 'inactive':
                document = await productService.updateMany(idList, { status: type })
                break 
            case 'delete':
                document = await productService.updateMany(idList, {
                    deleted: true,
                    deletedAt: new Date()
                })
                break
            // case 'position':
            //     for(const item of idList) {
            //         const [ id, position ] = item.split('-')
            //         await productService.updateOne({ _id: id }, { position: position })
            //     }
            //     break
            default:
                break
        }

        res.send({
            message: "Change state of multiple product successfully",
            updatedDocument: document
        })
    }
    catch (err) {
        return next(
            new ApiError(500, `An error occurred while changing the state of multiple product`)
        )
    }
}

// [POST] /products/create
module.exports.create = async (req, res, next) => {

    const productService = new ProductService()

    try {
        const data = { ...req.body }
        data.price = parseInt(req.body.price)
        data.discountPercentage = parseInt(req.body.discountPercentage)
        data.stock = parseInt(req.body.stock)

        if (!req.body?.position) { 
            data.position = await productService.count() + 1
        } 
        else {
            data.position = parseInt(req.body.position)
        }

        if (!req.body?.category || req.body.category === '') {
            data.category = 'fresh-flowers'
        }

        // if (req.file) {
        //     req.body.thumbnail = `/uploads/${req.file.filename}`
        // }

        const document = await productService.create(data)

        res.send({
            message: "Create a new product successfully",
            updatedDocument: document
        })
    }
    catch (err) {
        return next(
            new ApiError(500, `An error occurred while creating a new product`)
        )
    }
}

// [GET] /products/:slug
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

// [DELETE] /accounts/:id
module.exports.deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params

        const productService = new ProductService()
        const document = await productService.deleteOne(id)

        res.send({
            message: `Delete product ${id} successfully`,
            updatedDocument: document
        })
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while deleting the product")
        )
    }
}

// [GET] /products/:category
// module.exports.findCategory = async (req, res, next) => {
//     try {
//         const { category } = req.params
//         const filter = {
//             category,
//             deleted: false,
//         }

//         const productService = new ProductService()
//         const products = await productService.find(filter)
//         return res.send(products)
//     }
//     catch (err) {
//         return next (
//             new ApiError(500, "An error occurred while retrieving the products")
//         )
//     }
// }


