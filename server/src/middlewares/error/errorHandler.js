export const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",

    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
