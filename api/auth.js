const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/db');
const validator = require('../middleware/dataValidator');
const { RequestError } = require('./errors');
const { userSchema } = require('../data/schemas');

const authRouter = express.Router();

authRouter.post('/register', validator(userSchema), register);
authRouter.post('/login', login);

module.exports = authRouter;

function generateToken(user) {
  const jwtKey = process.env.JWT_SECRET || 'set variable in .env in the project root';
  const { id, username } = user;
  const payload = {
    id,
    username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, jwtKey, options);
}

async function register(req, res) {
  let user = req.body;
  const existingUser = await db.users.getBy({ username: user.username });

  if (existingUser) throw new RequestError(400, 'User already registered.');

  const hash = await bcrypt.hash(user.password, 12);
  user.password = hash;
  const newUser = await db.users.create(user);
  const token = generateToken(newUser);
  res.status(201).json({
    message: `User registered. Welcome ${newUser.username}.`,
    token
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await db.users.getBy({ username });
  const credentialsValid = user && password ? await bcrypt.compare(password, user.password) : false;

  if (!credentialsValid) throw new RequestError(401, 'Invalid Credentials.');

  const token = generateToken(user);
  res.status(200).json({ message: `Welcome, ${user.username}.`, token });
}
