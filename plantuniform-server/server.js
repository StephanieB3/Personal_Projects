require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

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

// ✅ Products route
const productsRoute = require('./routes/products');
app.use('/products', productsRoute);

// ✅ NEW: Phone route
const phoneRoutes = require('./routes/phone'); // <-- make sure this file exists!
app.use('/api/phone', phoneRoutes);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('🌱 plantuniform API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
