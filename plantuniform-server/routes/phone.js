// routes/phone.js
const express = require('express');
const router = express.Router();
const PhoneNumber = require('../models/PhoneNumber'); // ✅ model file

router.post('/', async (req, res) => {
  try {
    const { number } = req.body;
    const phone = new PhoneNumber({ number });
    await phone.save();
    res.status(201).json({ message: '✅ Phone number saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Failed to save phone number.' });
  }
});

module.exports = router;
