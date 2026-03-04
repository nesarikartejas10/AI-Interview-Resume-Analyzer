import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/envConfig.js";
import { BlacklistToken } from "../models/blacklist.model.js";

export const registerController = asyncHandler(async (req, res, next) => {
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

export const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError(401, "Invalid credentials"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(createHttpError(401, "Invalid credentials"));
  }

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

  return res.status(200).json({
    status: true,
    message: "User logged in successfully",
    user: { id: user._id, username: user.username, email: user.email },
  });
});

export const logoutController = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    await BlacklistToken.create({ token });
  }

  res.clearCookie("token");

  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});
