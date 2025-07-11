// plantuniform-server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET all products (with optional ?category=...)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
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

// ✅ POST: Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, size, category, slug, image, backImage } = req.body;

    if (!name || !price || !size || !category || !slug || !image) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const existing = await Product.findOne({ slug });
    if (existing) {
      return res.status(400).json({ error: 'Slug already exists. Use a unique slug.' });
    }

    const newProduct = new Product({ name, price, size, category, slug, image, backImage });
    await newProduct.save();

    console.log('✅ Product created:', newProduct);
    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (err) {
    console.error('❌ Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product.' });
  }
});

// ✅ DELETE: Remove product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    console.log('✅ Product deleted:', deleted);
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('❌ Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

module.exports = router;
