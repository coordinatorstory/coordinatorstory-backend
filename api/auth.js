const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/db');
const { validateUser } = require('./validators');
const { generateToken } = require('../auth/authentication');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = authRouter;

async function register(req, res) {
  try {
    let user = req.body;
    const { error } = validateUser(user);
    if (error) {
      res.status(400).json({
        error: error.details[0].message
      });
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
