import { Router } from "express";
import { create, deleteCheckout, getAll, getById, updateCheckout } from "../controller/checkout";

const router = Router();

router.get(`/checkout`, getAll);
router.get(`/checkout/:id`, getById);
router.post(`/checkout`, create);
router.put(`/checkout/:id`, updateCheckout);
router.delete(`/checkout/:id`, deleteCheckout);

export default router;