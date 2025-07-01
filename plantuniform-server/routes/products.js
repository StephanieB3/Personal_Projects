const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET all products, with optional ?category=...
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category; // ✅ Only match given category
    }

    console.log('🔎 Products query filter:', filter);

    const products = await Product.find(filter);
    console.log(`✅ ${products.length} products found for filter:`, filter);

    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ✅ GET single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('❌ Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
