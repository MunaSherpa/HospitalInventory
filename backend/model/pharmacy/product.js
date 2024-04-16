const mongoose = require('mongoose');
const Schema = mongoose.Schema


// const productSchema = new mongoose.Schema({
const productSchema = new Schema({
  image: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },


});

// module.exports = mongoose.model('Product', productSchema);
const ProductSchema = mongoose.model("Product", productSchema)
module.exports = ProductSchema

