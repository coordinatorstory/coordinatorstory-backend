const express = require('express');
const db = require('../data/db');
const { validateStory } = require('./validators');

const usersRouter = express.Router();

usersRouter.get('/stories', getUserStories);
usersRouter.post('/stories', createUserStory);

async function getUserStories(req, res) {
  try {
    const stories = await db.stories.getUserStories(req.user.id);
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get stories.' });
  }
}

async function createUserStory(req, res) {
  try {
    const story = req.body;
    const { error } = validateStory(story);
    if (error) {
      res.status(400).json({
        error: error.details[0].message
      });
    } else {
      const newStory = await db.stories.create(story);
      res.status(201).json(newStory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create story.' });
  }
}

module.exports = usersRouter;
