const BaseError = require("../errors/BaseError");

function errorHandler(err, req, res, next) {
  let httpStatusCode = 500;
  let message = "Internal Server Error";
  if (err.message === 'SequelizeForeignKeyConstraintError') {
    httpStatusCode = 400;
    message = 'Bad Request';
  } else if(err instanceof BaseError) {
    httpStatusCode = err.httpStatusCode;
    message = err.message;
  } 
  else {
    if (process.env.NODE_ENV !== "production") {
      if (typeof err === "string") {
        message = err;
      } else if (err instanceof Error) {
        message = err.message;
      }
    }
  }

  let stackTrace = undefined;

  if (process.env.NODE_ENV !== "production") {
    stackTrace = err.stack;
  }

  // return the standard error response
  res.status(httpStatusCode).send({
    error: {
      message: message,
      timestamp: err.timestamp || undefined,
      stackTrace: stackTrace,
    },
  });

  return next(err);
}

module.exports = errorHandler;
