import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/envConfig.js";
import { BlacklistToken } from "../models/blacklist.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createHttpError(401, "Access denied, Token not provided"));
  }

  const isTokenBlacklisted = await BlacklistToken.findOne({ token });
  if (isTokenBlacklisted) {
    return next(401, "Token has been revoked. Please login again.");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return next(createHttpError(401, "Invalid token"));
  }
};
