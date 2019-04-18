module.exports = (err, req, res, next) => {
  const env = process.env.DB_ENV;

  if (env !== 'testing') {
    console.error(`Error: ${req.method} ${req.path}`);
    console.error(err.stack);
  }

  let error = err.message;

  if (env === 'production') error = 'An error occurred while processing your request.';

  res.status(err.statusCode || 500).json({ error });
};
