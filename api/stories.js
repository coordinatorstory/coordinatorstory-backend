const express = require('express');
const db = require('../data/db');

const storiesRouter = express.Router();

storiesRouter.get('/', getStories);

module.exports = storiesRouter;

async function getStories(req, res) {
  try {
    const { country } = req.query;
    if (country) {
      const stories = await db.stories.getCountryStories(country);
      res.status(200).json(stories);
    } else {
      const stories = await db.stories.getAll();
      res.status(200).json(stories);
    }
  } catch (error) {
    res.status(500).json({ error: 'Cannot get stories.' });
  }
}
