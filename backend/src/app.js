import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to AI Interview System</h1>");
});

export default app;
