import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! ádsadsa");
});

export const viteNodeApp = app;
