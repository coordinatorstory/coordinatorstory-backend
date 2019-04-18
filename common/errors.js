class RequestError extends Error {
  constructor(statusCode = 500, message) {
    super(message);
    this.name = 'RequestError';
    this.statusCode = statusCode;
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

module.exports = {
  RequestError,
  DatabaseError
};
