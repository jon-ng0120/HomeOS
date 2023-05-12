const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/create', async (req, res, next) => {
  const { googleId, uuid, name, url, icon } = req.body;
  try {
    const doc = await User.findOne({ google_id: googleId });
    doc.websites.push({
      name,
      uuid,
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

router.post('/delete', async (req, res) => {
  const { googleId, uuid } = req.body;
  try {
    await User.updateOne(
      {
        google_id: googleId,
      },
      {
        $pull: {
          websites: { uuid },
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post('/update', async (req, res) => {
  const { googleId, website, url, uuid } = req.body;
  try {
    await User.findOneAndUpdate(
      {
        google_id: googleId,
      },
      {
        $set: {
          'websites.$[el].name': website,
          'websites.$[el].url': url,
        },
      },
      {
        arrayFilters: [{ 'el.uuid': uuid }],
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
