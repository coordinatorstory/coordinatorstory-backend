const express = require('express');
const db = require('../data/db');

const storiesRouter = express.Router();

storiesRouter.get('/', getStories);
storiesRouter.get('/:id', getStory);

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
    console.log(error);
    res.status(500).json({ error: 'Cannot get stories.' });
  }
}

async function getStory(req, res) {
  try {
    const { id } = req.params;
    const story = await db.stories.getBy({ id });
    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
    } else {
      res.status(200).json(story);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get story.' });
  }
}
