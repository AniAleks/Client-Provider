class AppError extends Error {
    constructor(message, status) {
      super(message);
  
      this.status= status;
      this.status = `${status}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;