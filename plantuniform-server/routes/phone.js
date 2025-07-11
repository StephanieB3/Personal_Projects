const express = require('express');
const router = express.Router();
const PhoneNumber = require('../models/PhoneNumber');

// POST /api/phone
router.post('/', async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const phoneNumber = new PhoneNumber({ number });
    await phoneNumber.save();

    res.json({ message: 'Phone number saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save phone number.' });
  }
});

module.exports = router;
