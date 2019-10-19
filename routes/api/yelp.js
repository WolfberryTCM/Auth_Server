const express = require('express')
const router = express.Router();


module.exports = router;
const yelp = require('yelp-fusion');

const apiKey = 'Odg9uPbiFf1vP-5fszD3E6JqnDuepzcVvEpt2hM158dmRO2T2neXDj8qmUrdzksdhCa3HKhrzErfx59K5oZBhYXAOR4via8PPNFd-7YPJH4mfShItuGKmCFdr5KnXXYx'

const client = yelp.client(apiKey);

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

// @route  GET api/yelp
// @desc   query yelp api
// @access Public
router.post('/',async (req,res) => {
  try {
    const data = await client.search(req.body);
    res.json(data.jsonBody.businesses);
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

