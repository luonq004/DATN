import cookieParser from 'cookie-parser';
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import sliderRouter from './routers/slider';
import logoRouter from './routers/Logo';
import categoriesRouter from './routers/Categories';
import collectionRouter from './routers/Collections';
import userRouter from './routers/Users';


config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

const dbUrl = process.env.DB_URI;
connectDB(dbUrl);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/sliders", sliderRouter);
app.use("/api/logo", logoRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/collections", collectionRouter)
app.use("/api/users", userRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export const viteNodeApp = app;
