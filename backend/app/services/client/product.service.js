class ProductService {
    constructor() {
        this.Product = require('../../models/product.model')
    }

    async find(filter) {
        const products = await this.Product.find(filter).sort({ position: 'desc' })
        return products
    }

    async findBySlug(slug) {
        const product = await this.Product.findOne({ slug, deleted: false, status: 'active' })
        return product
    }
}

module.exports = ProductService