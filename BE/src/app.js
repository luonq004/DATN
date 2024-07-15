import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export const viteNodeApp = app;
