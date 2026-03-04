import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to AI Interview System</h1>");
});

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

export default app;
