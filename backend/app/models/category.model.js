const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categorySchema = new Schema({
    name: String,
    thumbnail: String,
    position: Number,
    slug: {
        type: String,
        slug: "name",
        unique: true,
    }
}, { timestamps: true })

const Category = mongoose.model('Categorie', categorySchema)

module.exports = Category