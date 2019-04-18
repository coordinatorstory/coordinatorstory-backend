const express = require('express');
const storiesData = require('../data/stories');
const validator = require('../middleware/dataValidator');
const { RequestError } = require('../common/errors');
const { storySchema } = require('../data/schemas');

const userRouter = express.Router();

userRouter.get('/stories', getUserStories);
userRouter.post('/stories', validator(storySchema), createUserStory);
userRouter.put('/stories/:id', validator(storySchema), updateUserStory);
userRouter.delete('/stories/:id', deleteUserStory);

module.exports = userRouter;

async function getUserStories(req, res) {
  const stories = await storiesData.getUserStories(req.user.id);
  res.status(200).json(stories);
}

async function createUserStory(req, res) {
  const story = req.body;
  story.user_id = req.user.id;
  const newStory = await storiesData.create(story);
  res.status(201).json(newStory);
}

async function deleteUserStory(req, res) {
  const { id } = req.params;
  const story = await storiesData.getBy({ id, user_id: req.user.id });

  if (!story) throw new RequestError(404, 'Story not found.');

  await storiesData.delete(id);
  res.status(204).end();
}

async function updateUserStory(req, res) {
  const { id } = req.params;
  const storyUpdates = req.body;
  storyUpdates.user_id = req.user.id;
  const updatedCount = await storiesData.update(req.user.id, id, storyUpdates);

  if (!updatedCount) throw new RequestError(404, 'The story with the specified ID does not exist.');

  res.status(204).end();
}
