const express = require('express');
const bcrypt = require('bcryptjs');
// const db = require('../database/dbConfig');

const authRouter = express.Router();

const { authenticate, generateToken } = require('../auth/authenticate');

// const USERS_TABLE = 'users';

authRouter.post('/register', register);
authRouter.post('/login', login);

async function register(req, res) {}

async function login(req, res) {}

module.exports = authRouter;
