const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date,
    default: Date.now
  }
}, {collection: 'phone' });

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
