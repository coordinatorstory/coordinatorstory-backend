const express = require('express');
const db = require('../data/db');

const usersRouter = express.Router();

usersRouter.get('/:username/stories', getUserStories);

async function getUserStories(req, res) {
  try {
    const stories = await db.stories.getUserStories(req.user.id);
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get stories.' });
  }
}

module.exports = usersRouter;
