require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Multer config for front & back image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists!
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// ✅ Serve static files:
// 1) From the project ROOT (../) — this serves style.css, index.html, etc.
app.use(express.static(path.join(__dirname, '..')));

// 2) From plantuniform-server — this serves admin.html
app.use(express.static(__dirname));

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

// ✅ Handle front & back image uploads with Multer
app.post('/upload', upload.fields([
  { name: 'frontImageFile', maxCount: 1 },
  { name: 'backImageFile', maxCount: 1 }
]), (req, res) => {
  console.log('🔍 Uploaded files:', req.files);

  if (!req.files || (!req.files['frontImageFile'] && !req.files['backImageFile'])) {
    return res.status(400).json({ error: 'No files uploaded.' });
  }

  const response = {};
  if (req.files['frontImageFile']) {
    response.frontImagePath = `/uploads/${req.files['frontImageFile'][0].filename}`;
  }
  if (req.files['backImageFile']) {
    response.backImagePath = `/uploads/${req.files['backImageFile'][0].filename}`;
  }

  res.json(response);
});

// ✅ Serve admin.html at /admin
app.get('/admin', (req, res) => {
  const filePath = path.join(__dirname, 'admin.html');
  console.log('🔍 Serving admin.html from:', filePath);
  res.sendFile(filePath);
});

// ✅ OPTIONAL: Redirect /admin.html to /admin
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
