/**
 * Multer Error Handler Middleware
 * Catches Multer-specific errors and returns user-friendly messages
 */
const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    if (err.name === 'MulterError') {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 5MB per file.',
        });
      }

      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 5 files allowed.',
        });
      }

      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 5 files allowed.',
        });
      }

      // Other Multer errors
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Custom validation errors (from fileFilter)
    if (err.message === 'Not an image! Please upload only images.') {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Pass other errors to the global error handler
    next(err);
  } else {
    next();
  }
};

module.exports = multerErrorHandler;
