import { Router } from "express";
import { createOrder, getAllOrders, getOrdersById } from "../controller/order";

const routerOrder = Router();
// tạo đơn hàng
routerOrder.post("/create-order", createOrder);
routerOrder.get("/get-all-orders/:userId", getAllOrders);
routerOrder.get("/get-orders/:orderId", getOrdersById);
export default routerOrder;