import { Router } from "express";
import { createComment, getAllComment } from "../controllers/comment";

const commentRouter = Router();

commentRouter.post("/", createComment);

commentRouter.get("/", getAllComment);
// commentRouter.post("/", upload.single("image"), createSlide);

export default commentRouter;
