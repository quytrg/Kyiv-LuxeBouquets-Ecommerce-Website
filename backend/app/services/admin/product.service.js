class ProductService {
    constructor() {
        this.Product = require('../../models/product.model')
    }

    extractProductData(payload) {
        const product = {
            title: payload.title,
            description: payload.description,
            price: payload.price,
            discountPercentage: payload.discountPercentage,
            stock: payload.stock,
            thumbnail: payload.thumbnail,
            status: payload.status,
            position: payload.position,
            category: payload.category,
            deleted: payload.deleted,
            deletedAt: payload.deletedAt
        }
        
        Object.keys(product).forEach(key => (
            product[key] === undefined && delete product[key]
        ))

        return product
    }

    async find(filter) {
        const products = await this.Product.find(filter).sort({ position: 'desc' })
        return products
    }

    async findBySlug(slug) {
        const product = await this.Product.findOne({ slug, deleted: false })
        return product
    }

    async updateOne(id, payload) {
        const filter = {
            _id: id
        }
        
        const data = this.extractProductData(payload)
        
        const result = await this.Product.updateOne(filter, data)

        return result
    }

    async updateMany(ids, payload) {
        const filter = {
            _id: {$in: ids}
        }

        const data = this.extractProductData(payload)

        const result = await this.Product.updateMany(filter, data)

        return result
    }

    async create(payload) {
        const data = this.extractProductData(payload)

        const result = await this.Product.create(data)
        await result.save()

        return result
    }

    async count() {
        const result = await this.Product.countDocuments()
        return result
    }

    // async findBySlug(slug) {
    //     const product = await this.Product.findOne({ slug })
    //     return product
    // }

    async deleteOne(id) {
        const filter = {
            _id: id
        }

        const result = await this.Product.updateOne(filter, { deleted: true })
        return result
    }
}

module.exports = ProductService