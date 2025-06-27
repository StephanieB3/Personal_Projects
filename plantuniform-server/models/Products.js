const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  size: String,
  slug: String
});

module.exports = mongoose.model('Product', productSchema);
