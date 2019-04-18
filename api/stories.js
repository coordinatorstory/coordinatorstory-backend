const express = require('express');
const storiesData = require('../data/stories');
const { RequestError } = require('../common/errors');

const storiesRouter = express.Router();

storiesRouter.get('/', getStories);
storiesRouter.get('/:id', getStory);

module.exports = storiesRouter;

async function getStories(req, res) {
  const { country } = req.query;
  if (country) {
    const stories = await storiesData.getCountryStories(country);
    res.status(200).json(stories);
  } else {
    const stories = await storiesData.getAll();
    res.status(200).json(stories);
  }
}

async function getStory(req, res) {
  const { id } = req.params;
  const story = await storiesData.getBy({ id });

  if (!story) throw new RequestError(404, 'Story not found.');

  res.status(200).json(story);
}
