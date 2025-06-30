const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  size: String,
  slug: String
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema);
