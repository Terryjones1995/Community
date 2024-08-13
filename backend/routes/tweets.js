// backend/routes/tweets.js
const express = require('express');
const router = express.Router();
const { Tweet } = require('../models'); // Sequelize model

// Create a new tweet
router.post('/', async (req, res) => {
  try {
    const { user, content, image, location } = req.body;
    const newTweet = await Tweet.create({ user, content, image, location });
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tweet' });
  }
});

module.exports = router;
