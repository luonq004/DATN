import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import routerAddress from "./routers/Address";
import routerOrder from "./routers/Order";
import { connectDB } from "./config/db";
import productRouter from "./routers/product.router";
import attributeRouter from "./routers/attribute.router";
import attributeValueRouter from "./routers/attributevalue";
import routerCategory from "./routers/category";
import { createProduct } from "./controllers/products";
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

app.use(morgan("dev"));
/// connect DB
connectDB(process.env.DB_URI);
//Router
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// ================ tạo địa chỉ  ===========
app.use("/api", routerAddress);
// ================ order ===========
app.use("/api", routerOrder);

//routers
app.use("/api/v1", productRouter);
app.use("/api/v1", attributeRouter);
app.use("/api", attributeValueRouter);
app.use("/api", routerCategory);
app.use("/api", routerCart);
app.use("/api", routerVoucher);
app.post("/api/products/add", createProduct);
app.post("/api/variant/add", createVariant);
app.delete("/api/variant/:id", removeVariant);
app.post("/api/user/add", createUser);
// app.use("/api", authRouter);

export const viteNodeApp = app;
