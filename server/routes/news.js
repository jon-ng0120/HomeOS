const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res, next) => {
  const { country, category } = req.body;
  const request = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=023293fc74884b89b7ef26247d57463a`
  );
  const data = await request.json();
  res.send(data);
});

module.exports = router;
