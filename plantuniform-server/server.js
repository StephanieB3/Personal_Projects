require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists!
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// ✅ Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// ✅ Serve static files from root (CSS, JS, etc.)
app.use(express.static(__dirname));

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

// ✅ API routes
const productsRoute = require('./routes/products');
app.use('/products', productsRoute);

const phoneRoutes = require('./routes/phone');
app.use('/api/phone', phoneRoutes);

// ✅ File upload endpoint for products
app.post('/upload', upload.single('imageFile'), (req, res) => {
  console.log('🔍 Uploaded file:', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// ✅ Serve admin.html at /admin
app.get('/admin', (req, res) => {
  const filePath = path.join(__dirname, 'admin.html');
  console.log('🔍 Serving admin.html from:', filePath);
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
