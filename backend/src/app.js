import express from "express";
import { globalErrorHandler } from "./middlewares/globalError.middleware.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/envConfig.js";
import interviewRouter from "./routes/interview.routes.js";

const app = express();

app.use(
  cors({
    origin: config.frontendURL,
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.use(globalErrorHandler);

export default app;
