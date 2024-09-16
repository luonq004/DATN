import express from "express";
import { getTopUsers, logout, refreshToken, signin, signup } from "../controllers/auth";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.get('/top-users', getTopUsers);

export default router;