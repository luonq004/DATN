import express from "express";
import { createVoucher, updateVoucher, getAllVoucher, getAllVoucherWithCountDown, getOneVoucher, getVoucherWithCountdown, removeVoucher, statusVoucher } from "../controllers/voucher";

const routerVoucher = express.Router();

routerVoucher.get('/voucher/get-all', getAllVoucher);
routerVoucher.get('/voucher/get-one/:id', getOneVoucher);
routerVoucher.get('/voucher/get-all-countdown', getAllVoucherWithCountDown);
routerVoucher.get('/voucher/get-one-countdown/:id', getVoucherWithCountdown);
routerVoucher.post('/voucher/create-voucher', createVoucher);
routerVoucher.put('/voucher/update-voucher', updateVoucher);
routerVoucher.put('/voucher/change-status-voucher', statusVoucher);
routerVoucher.put('/voucher/delete-voucher', removeVoucher);

export default routerVoucher