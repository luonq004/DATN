import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderCode,
  getOrdersById,
  updateOrderStatus,
} from "../controllers/order";

const routerOrder = Router();
// tạo đơn hàng
routerOrder.post("/create-order", createOrder);
//  Lấy tất cả đơn hàng
routerOrder.get("/get-all-orders/:userId", getAllOrders);
// Lấy đơn hàng theo Id
routerOrder.get("/get-orders/:orderId", getOrdersById);
// - Tra cứu đơn hàng theo mã đơn hàng
routerOrder.get("/get-ordersCode/:orderCode", getOrderCode);
routerOrder.put("/update-order/:id", updateOrderStatus);
export default routerOrder;
