import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to AI Interview System</h1>");
});

app.use(globalErrorHandler);

export default app;
