import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  frontendURL: process.env.FRONTEND_URL,
  googleGenAiApiKey: process.env.GOOGLE_GENAI_API_KEY,
};

export const config = Object.freeze(_config);
