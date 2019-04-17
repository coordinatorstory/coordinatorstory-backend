const express = require('express');
const db = require('../data/db');
const validator = require('../middleware/requestValidator');
const { RequestError } = require('./errors');
const { storySchema } = require('../data/schemas');

const usersRouter = express.Router();

usersRouter.get('/stories', getUserStories);
usersRouter.post('/stories', validator(storySchema), createUserStory);
usersRouter.put('/stories/:id', validator(storySchema), updateUserStory);
usersRouter.delete('/stories/:id', deleteUserStory);

module.exports = usersRouter;

async function getUserStories(req, res) {
  const stories = await db.stories.getUserStories(req.user.id);
  res.status(200).json(stories);
}

async function createUserStory(req, res) {
  const story = req.body;
  story.user_id = req.user.id;
  const newStory = await db.stories.create(story);
  res.status(201).json(newStory);
}

async function deleteUserStory(req, res) {
  const { id } = req.params;
  const story = await db.stories.getBy({ id, user_id: req.user.id });

  if (!story) throw new RequestError(404, 'Story not found.');

  await db.stories.delete(id);
  res.status(204).end();
}

async function updateUserStory(req, res) {
  const { id } = req.params;
  const storyUpdates = req.body;
  storyUpdates.user_id = req.user.id;
  const updatedCount = await db.stories.update(req.user.id, id, storyUpdates);

  if (!updatedCount) throw new RequestError(404, 'The story with the specified ID does not exist.');

  res.status(204).end();
}
