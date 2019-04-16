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
const userRouter = require('./user');

server.use('/api/auth', authRouter);
server.use('/api/stories', storiesRouter);
server.use('/api/user', authMiddleware, userRouter);

module.exports = server;
