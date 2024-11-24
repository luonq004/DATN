import { Router } from "express";
import { createComment } from "../controllers/comment";

const commentRouter = Router();

commentRouter.post("/", createComment);
// commentRouter.post("/", upload.single("image"), createSlide);

export default commentRouter;
