import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

config();

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

//Middleware
app.use(express.json());

app.use(cors());

app.use(morgan("dev"));
/// connect DB
connectDB(process.env.DB_URI);
//Router
app.use(cookieParser());

const dbUrl = process.env.DB_URI;

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

app.use("/api/sliders", sliderRouter);
app.use("/api/logo", logoRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/collections", collectionRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export const viteNodeApp = app;
