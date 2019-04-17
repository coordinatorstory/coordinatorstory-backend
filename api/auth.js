const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/db');
const validator = require('../middleware/requestValidator');
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
  try {
    let user = req.body;
    const existingUser = await db.users.getBy({ username: user.username });

    if (existingUser) {
      res.status(400).json({ error: 'User already registered.' });
    } else {
      const hash = await bcrypt.hash(user.password, 12);
      user.password = hash;
      const newUser = await db.users.create(user);
      const token = generateToken(newUser);
      res.status(201).json({
        message: `User registered. Welcome ${newUser.username}.`,
        token
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot register new user.' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    // TODO check: does this return null already if no user found?
    const user = username ? await db.users.getBy({ username }) : null;
    const credentialsValid =
      user && password ? await bcrypt.compare(password, user.password) : false;
    // if (!user || !credentialsValid) {
    if (!credentialsValid) {
      res.status(401).json({ error: 'Invalid Credentials.' });
    } else {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome, ${user.username}.`, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot complete login.' });
  }
}
