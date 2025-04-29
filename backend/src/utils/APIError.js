class APIError extends Error {
    constructor(message, statusCode = 500, code = 'API_ERROR', details = null) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.code = code;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = APIError;