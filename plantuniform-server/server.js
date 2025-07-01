// ✅ Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

// ✅ Use CORS to allow cross-origin requests (frontend → backend)
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas connection established!');
})
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

// ✅ Optional: Serve static files from /public if you deploy the frontend together
app.use(express.static('public'));

// ✅ Root route for sanity check
app.get('/', (req, res) => {
  res.send('🌱 plantuniform API is running!');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

