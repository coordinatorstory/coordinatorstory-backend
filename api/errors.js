class RequestError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, RequestError);
  }
}

module.exports = {
  RequestError
};
