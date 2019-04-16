const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter = require('./auth');
const storiesRouter = require('./stories');

server.use('/api/auth', authRouter);
server.use('/api/stories', storiesRouter);

module.exports = server;
