import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required to be added in blacklist"],
  },
});

export const BlacklistToken = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema,
);
