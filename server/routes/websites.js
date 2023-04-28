const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/create', async (req, res, next) => {
  const { googleId, website, url } = req.body;
  const websiteDomain = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1];
  try {
    const doc = await User.findOne({ google_id: googleId });
    doc.websites.push({
      name: website,
      url: url,
      icon: `https://api.faviconkit.com/${websiteDomain}/144`,
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
