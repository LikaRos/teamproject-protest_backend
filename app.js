require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const fs = require("fs/promises");
// const nanoid = require("nanoid");
// const path = require("path");
// const multer = require("multer");
const authRouter = require("./routes/api/auth");
// const testRouter = require("./routes/api/test");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
// app.use("/api/questions", questionsRouter);
app.set("json space", 8);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;