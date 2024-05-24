const errorResponseHandler = (err, req, res, next) => {
  const statusCode = err.StatusCode || 400;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const invalidPathHandler = (req, res, next) => {
  let error = new Error("Invalid path.");
  error.statusCode = 404;
  next(error);
};

module.exports = { errorResponseHandler, invalidPathHandler };
