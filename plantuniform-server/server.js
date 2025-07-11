// ✅ Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas connection established!'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log('✅ DB name:', mongoose.connection.name);
  console.log('✅ Collections:', Object.keys(mongoose.connection.collections));
});

// ✅ API Routes
const productsRoute = require('./routes/products');
app.use('/products', productsRoute);

const phoneRoutes = require('./routes/phone'); // <-- This file should exist!
app.use('/api/phone', phoneRoutes);

// ✅ Serve static files from /public
app.use(express.static('public'));

// ✅ Root sanity check route
app.get('/', (req, res) => {
  res.send('🌱 plantuniform API is running!');
});

// ✅ Custom route to serve admin page nicely (no .html in URL)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
