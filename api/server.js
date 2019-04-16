const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter = require('./auth');
const storiesRouter = require('./stories');

server.use(authRouter);
server.use(storiesRouter);

server.get('/', async (req, res) => {
  res.status(200).json('It works!');
});

module.exports = server;
