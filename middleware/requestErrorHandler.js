module.exports = (err, req, res, next) => {
  if (process.env.DB_ENV !== 'testing') {
    console.error(err.stack);
  }
  res.status(err.statusCode || 500).json({ error: err.message });
};
