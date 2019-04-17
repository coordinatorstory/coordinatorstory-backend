const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const jwtKey = process.env.JWT_SECRET || 'set variable in .env in the project root';
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
};
