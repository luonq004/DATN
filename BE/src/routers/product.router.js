import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductForEdit,
  updateProduct,
} from "../controllers/products";
import { checkAuthClerk } from "../middlewares/CheckAuthClerk";
// import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.get("/products/:id/edit", getProductForEdit);

router.post("/products", createProduct);
// router.post("/products", checkAuth, addProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
