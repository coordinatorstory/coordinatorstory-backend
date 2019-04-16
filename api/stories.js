const express = require('express');
const db = require('../data/db');

const storiesRouter = express.Router();

// GET /stories -> all stories for user logged in, all for not logged in, by country with query string
// POST /stories -> create story

// GET /stories/<id> -> single story
// PUT /stories/<id> -> update story, protected
// DELETE /stories/<id> -> delete story, protected

storiesRouter.get('/', getStories);

async function getStories(req, res) {
  try {
    if (!req.user) {
      const stories = await db.stories.getAll();
      res.status(200).json(stories);
    } else {
      const stories = await db.stories.getAllBy({ user_id: req.user.userId });
      res.status(200).json(stories);
    }
  } catch (error) {
    res.status(500).json({ error: 'Cannot get stories.' });
  }
}

module.exports = storiesRouter;
