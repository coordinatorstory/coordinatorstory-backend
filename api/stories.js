const express = require('express');
const db = require('../data/db');
const { RequestError } = require('./errors');

const storiesRouter = express.Router();

storiesRouter.get('/', getStories);
storiesRouter.get('/:id', getStory);

module.exports = storiesRouter;

async function getStories(req, res) {
  const { country } = req.query;
  if (country) {
    const stories = await db.stories.getCountryStories(country);
    res.status(200).json(stories);
  } else {
    const stories = await db.stories.getAll();
    res.status(200).json(stories);
  }
}

async function getStory(req, res) {
  const { id } = req.params;
  const story = await db.stories.getBy({ id });

  if (!story) throw new RequestError(404, 'Story not found.');

  res.status(200).json(story);
}
