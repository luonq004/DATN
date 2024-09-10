import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routerAddress from "./routers/Address";
import { connectDB } from "./config/db";
import routerOrder from "./routers/Order";

const app = express();


dotenv.config();
//  middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
/// connect DB
connectDB(process.env.DB_URI);
//Router
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// ================ tạo địa chỉ  ===========
app.use("/api", routerAddress)
// ================ order ===========
app.use("/api", routerOrder)
export const viteNodeApp = app;
