import { Router } from "express";
import { createOrder, getAllOrders, getOrdersById, Top10_productOrder } from "../controllers/order";

const routerOrder = Router();
// tạo đơn hàng
routerOrder.post("/create-order", createOrder);
routerOrder.get("/get-all-orders/:userId", getAllOrders);
routerOrder.get("/get-orders/:orderId", getOrdersById);
routerOrder.get(`/orders/top10_products`, Top10_productOrder);

export default routerOrder;