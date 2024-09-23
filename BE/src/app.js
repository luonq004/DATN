
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";
import productRouter from "./routers/product.router";
import attributeRouter from "./routers/attribute.router";
import attributeValueRouter from "./routers/attributevalue";
import routerCategory from "./routers/category";
import { addProduct } from "./controllers/products";
import { createVariant, removeVariant } from "./controllers/variant";
import routerCart from "./routers/cart";
import { createUser } from "./controllers/user";
import routerVoucher from "./routers/voucher";

const app = express();
dotenv.config();
//Middleware
app.use(express.json());
// app.use(morgan("tiny"));
app.use(cors());
//connect db
connectDB(process.env.DB_URI);

//routers
app.use("/api", productRouter);
app.use("/api", attributeRouter);
app.use("/api", attributeValueRouter);
app.use("/api", routerCategory);
app.use("/api", routerCart);
app.use("/api", routerVoucher);
app.post("/api/products/add", addProduct);
app.post("/api/variant/add", createVariant);
app.delete("/api/variant/:id", removeVariant);
app.post("/api/user/add", createUser);
// app.use("/api", authRouter);

export const viteNodeApp = app;
