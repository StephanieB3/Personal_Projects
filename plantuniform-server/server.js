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

// ✅ Debug collections when connected
mongoose.connection.on('connected', () => {
  console.log('✅ DB name:', mongoose.connection.name);
  console.log('✅ Collections:', Object.keys(mongoose.connection.collections));
});

// ✅ API routes
const productsRoute = require('./routes/products');
app.use('/products', productsRoute);

const phoneRoutes = require('./routes/phone');
app.use('/api/phone', phoneRoutes);

// ✅ Serve static files (CSS, JS, images, etc.) from root directory
app.use(express.static(__dirname));

// ✅ Serve admin.html at /admin (OPTION 1)
app.get('/admin', (req, res) => {
  const filePath = path.join(__dirname, 'admin.html');
  console.log('🔍 Serving admin.html from:', filePath); // ✅ This log!
  res.sendFile(filePath);
});

// ✅ OPTIONAL: Redirect /admin.html to /admin for consistency
app.get('/admin.html', (req, res) => {
  res.redirect('/admin');
});

// ✅ Root sanity check
app.get('/', (req, res) => {
  res.send('🌱 plantuniform API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
