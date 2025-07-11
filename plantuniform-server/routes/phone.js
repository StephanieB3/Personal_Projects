const express = require('express');
const router = express.Router();
const PhoneNumber = require('../models/PhoneNumber');

// ✅ POST new phone number, prevent duplicates
router.post('/', async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  const existing = await PhoneNumber.findOne({ number });

  if (existing) {
    return res.json({ message: 'welcome back to da garden' });
  }

  const phone = new PhoneNumber({ number });
  await phone.save();

  res.json({ message: 'Phone number saved successfully.' });
});

// ✅ GET all phone numbers
router.get('/', async (req, res) => {
  const numbers = await PhoneNumber.find({});
  res.json(numbers);
});

module.exports = router;
