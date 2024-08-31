import express from "express";
import cors from "cors";
import { config } from "dotenv";
import router from "./Routes";
import { connectDB } from "./config/db";

config(); // nạp biến môi trường từ .env

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbUrl = process.env.DB_URI || 8080;
connectDB(dbUrl);

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const viteNodeApp = app;
