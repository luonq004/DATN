import { Router } from "express";
import { createOrder, getAllOrders, getOrderCode, getOrdersById } from "../controller/order";

const routerOrder = Router();
// tạo đơn hàng
routerOrder.post("/create-order", createOrder);
//  Lấy tất cả đơn hàng
routerOrder.get("/get-all-orders/:userId", getAllOrders);
// Lấy đơn hàng theo Id
routerOrder.get("/get-orders/:orderId", getOrdersById);
// - Tra cứu đơn hàng theo mã đơn hàng
routerOrder.get("/get-ordersCode/:orderCode", getOrderCode);
export default routerOrder;