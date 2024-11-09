import express from "express";
import { createVoucher, editVoucher, getAllVoucher, getOneVoucher, removeVoucher } from "../controllers/voucher";

const routerVoucher = express.Router();

routerVoucher.get('/voucher', getAllVoucher);
routerVoucher.get('/voucher/:id', getOneVoucher);
routerVoucher.post('/voucher', createVoucher);
routerVoucher.put('/voucher/:id', editVoucher);
routerVoucher.delete('/voucher/:id', removeVoucher);

export default routerVoucher