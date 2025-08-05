export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    console.error(err);
  
    res.status(statusCode).json({
      status: 'error',
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }