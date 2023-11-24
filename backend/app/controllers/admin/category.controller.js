const ApiError = require('../../middlewares/api-error.js')
const CategoryService = require('../../services/admin/category.service.js')

module.exports.find = async (req, res, next) => {
    try {
        const categoryService = new CategoryService()

        const filter = {}
        
        // const { slug } = req.params

        // if (slug) {
        //     const category = await categoryService.findBySlug(slug)
        //     res.send(category)
        // }
        // else {
         
        //     ...
            
        // }        

        const categories = await categoryService.find(filter)
        res.send(categories)
    }
    catch (err) {
        return next (
            new ApiError(500, "An error occurred while retrieving the category")
        )
    }
}