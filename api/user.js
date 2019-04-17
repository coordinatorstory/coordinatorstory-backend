const express = require('express');
const db = require('../data/db');
const validator = require('../middleware/requestValidator');
const { storySchema } = require('../data/schemas');

const usersRouter = express.Router();

usersRouter.get('/stories', getUserStories);
usersRouter.post('/stories', validator(storySchema), createUserStory);
usersRouter.put('/stories/:id', validator(storySchema), updateUserStory);
usersRouter.delete('/stories/:id', deleteUserStory);

module.exports = usersRouter;

async function getUserStories(req, res) {
  try {
    const stories = await db.stories.getUserStories(req.user.id);
    res.status(200).json(stories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get stories.' });
  }
}

async function createUserStory(req, res) {
  try {
    const story = req.body;
    story.user_id = req.user.id;
    const newStory = await db.stories.create(story);
    res.status(201).json(newStory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create story.' });
  }
}

async function deleteUserStory(req, res) {
  try {
    const { id } = req.params;
    const story = await db.stories.getBy({ id, user_id: req.user.id });

    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
    } else {
      await db.stories.delete(id);
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot delete story.' });
  }
}

async function updateUserStory(req, res) {
  try {
    const { id } = req.params;
    const storyUpdates = req.body;
    storyUpdates.user_id = req.user.id;
    const updatedCount = await db.stories.update(req.user.id, id, storyUpdates);

    if (!updatedCount) {
      res.status(404).json({ error: 'The story with the specified ID does not exist.' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot update story.' });
  }
}
