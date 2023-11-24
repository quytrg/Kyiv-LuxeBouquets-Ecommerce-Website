const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 1
    },
    thumbnail: String,
    status: {
        type: String,
        default: 'active'
    },
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    category: {
        type: String,
        default: 'active'
    },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product