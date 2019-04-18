class RequestError extends Error {
  constructor(statusCode = 500, message) {
    super(message);
    this.name = 'RequestError';
    this.statusCode = statusCode;
  }
}

// class BadRequestError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'BadRequestError';
//     this.statusCode = 400;
//   }
// }

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'NotFoundError';
//     this.statusCode = 404;
//   }
// }

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
