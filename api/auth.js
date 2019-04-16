const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/db');
const { generateToken } = require('../auth/authentication');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

async function register(req, res) {
  try {
    let user = req.body;
    if (!user.username || !user.password) {
      res.status(400).json({ error: 'Username and password are required.' });
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
    res.status(500).json({ error: 'Cannot complete login.' });
  }
}

module.exports = authRouter;
