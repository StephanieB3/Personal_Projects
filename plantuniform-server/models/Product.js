const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  backImage: String,
  price: Number,
  size: String,
  slug: String,
  category: String
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema);
