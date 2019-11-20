const express = require('express')
const router = express.Router();

const yelp = require('yelp-fusion');

const apiKey = 'Odg9uPbiFf1vP-5fszD3E6JqnDuepzcVvEpt2hM158dmRO2T2neXDj8qmUrdzksdhCa3HKhrzErfx59K5oZBhYXAOR4via8PPNFd-7YPJH4mfShItuGKmCFdr5KnXXYx'

const client = yelp.client(apiKey);

// @route  POST api/yelp
// @desc   yelp api Business Search
// @access Public
router.post('/',async (req,res) => {
  try {
    const data = await client.search(req.body);
    res.json(data.jsonBody);
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

// @route  POST api/yelp
// @desc   yelp api Business Details
// @access Public
router.post('/detail',async (req,res) => {
  try {
    const data = await client.business(req.body.alias);
    res.json(data.jsonBody);
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

// @route  POST api/yelp
// @desc   yelp api Business Reviews
// @access Public
router.post('/reviews',async (req,res) => {
  try {
    const data = await client.reviews(req.body.alias);
    res.json(data.jsonBody.reviews);
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

// @route  POST api/yelp
// @desc   yelp api Autocomplete
// @access Public
router.post('/autocomplete',async (req,res) => {
  try {
    const data = await client.autocomplete(req.body);
    res.json(data.jsonBody.terms);
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

module.exports = router;
