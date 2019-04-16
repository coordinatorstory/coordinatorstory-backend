const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';

module.exports = {
  generateToken,
  authMiddleware
};

function generateToken(user) {
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

function authMiddleware(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err)
        return res.status(401).json({ error: 'Not authorized. Log in to access this resource' });
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
}
