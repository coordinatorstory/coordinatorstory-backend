const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { authMiddleware } = require('../auth/authentication');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter = require('./auth');
const storiesRouter = require('./stories');
const usersRouter = require('./users');

server.use('/api/auth', authRouter);
server.use('/api/stories', storiesRouter);
server.use('/api/users', authMiddleware, usersRouter);

module.exports = server;
