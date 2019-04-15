const express = require('express');
// const db = require('../database/dbConfig');

const storiesRouter = express.Router();

authRouter.post('/stories', getStories);

async function getStories(req, res) {}

module.exports = storiesRouter;
