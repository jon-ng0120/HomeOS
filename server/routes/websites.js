const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/create', async (req, res, next) => {
  const { googleId, website, url, icon } = req.body;

  try {
    const doc = await User.findOne({ google_id: googleId });
    doc.websites.push({
      name: website,
      url: url,
      icon: icon,
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
