import { config } from "../config/envConfig.js";

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    errorStack: config.env === "production" ? null : err.stack,
  });
};
