const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter = require('./auth');

server.use(authRouter);

server.get('/', async (req, res) => {
  res.status(200).json('It works!');
});

module.exports = server;
