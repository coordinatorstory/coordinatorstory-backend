module.exports = (err, req, res, next) => {
  const env = process.env.DB_ENV;
  let error = err.message;
  const statusCode = err.statusCode || 500;

  if (env !== 'testing' && err.statusCode > 499) {
    console.error(`Error during ${req.method} at ${req.path}`);
    console.error(err.stack);
  }

  if (env === 'production') error = 'An error occurred while processing your request.';

  res.status(statusCode).json({ error });
};
