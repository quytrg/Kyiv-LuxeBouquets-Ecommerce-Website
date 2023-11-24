class CategoryService {
    constructor() {
        this.Category = require('../../models/category.model')
    }

    async find(filter) {
        const categories = await this.Category.find(filter).sort({ position: 'desc' })
        return categories
    }

    async findBySlug(slug) {
        const category = await this.Category.findOne({ slug })
        return category
    }
}

module.exports = CategoryService