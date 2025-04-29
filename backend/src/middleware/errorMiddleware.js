function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({
        error: {
          message: err.message,
          code: err.code,
          details: err.details
        }
      });
    }
    
    // Handle other types of errors
    res.status(500).json({
      error: {
        message: 'Internal Server Error',
        code: 'INTERNAL_ERROR'
      }
    });
  }
  
  module.exports = errorHandler;