const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true   // ✅ This ensures duplicates cannot be saved in MongoDB
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Make sure to use the exact 'phone' collection name to match Atlas
module.exports = mongoose.model('PhoneNumber', phoneNumberSchema, 'phone');
