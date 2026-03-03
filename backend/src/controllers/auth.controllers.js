import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/envConfig.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  const isExistingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (isExistingUser) {
    return next(
      createHttpError(
        400,
        isExistingUser.username === username
          ? "Username already exist"
          : "Account already exists with this email address",
      ),
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    config.jwtSecret,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    user: { id: user._id, username: user.username, email: user.email },
    message: "User registered successfully",
  });
});
