const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authenticator = require('../middleware/authenticator');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

if (process.env.DB_ENV !== 'testing') {
  server.use(morgan('short'));
}

const authRouter = require('./auth');
const storiesRouter = require('./stories');
const userRouter = require('./user');

server.use('/api/auth', authRouter);
server.use('/api/stories', storiesRouter);
server.use('/api/user', authenticator, userRouter);

module.exports = server;
