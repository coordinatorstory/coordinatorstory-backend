const express = require('express');
const db = require('../data/db');

const storiesRouter = express.Router();

storiesRouter.post('/stories', getStories);

async function getStories(req, res) {}

module.exports = storiesRouter;
