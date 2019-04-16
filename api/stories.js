const express = require('express');
const db = require('../data/db');

const storiesRouter = express.Router();

authRouter.post('/stories', getStories);

async function getStories(req, res) {}

module.exports = storiesRouter;
