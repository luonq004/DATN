import { Router } from "express";

const commentRouter = Router();

commentRouter.get("/", getAllSlides);
commentRouter.post("/", upload.single("image"), createSlide);

export default commentRouter;
