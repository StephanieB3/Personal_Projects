// testConnection.js

require('dotenv').config();  // Load variables from your .env file
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

console.log('🔍 MONGO_URI:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Atlas connection successful!');
    process.exit(0); // Exit the process successfully
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error(err);
    process.exit(1); // Exit with failure
  });
