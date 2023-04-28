const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/create', async (req, res, next) => {
  const { googleId, name, url, icon } = req.body;
  console.log(req.body);
  try {
    const doc = await User.findOne({ google_id: googleId });
    doc.websites.push({
      name,
      url,
      icon,
    });
    await doc.save();
    res.status(204).json({
      message: 'Document updated',
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
