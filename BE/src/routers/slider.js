import { Router } from "express";
import upload from "../config/upload";
import { createSlide, deleteSlide, getAllSlides, getSlideDetail, updateSlide } from "../controllers/slider";

const sliderRouter = Router();

sliderRouter.get("/", getAllSlides);
sliderRouter.get("/:id", getSlideDetail);
sliderRouter.post("/", upload.single("image"), createSlide);
sliderRouter.put("/:id", upload.single("image"), updateSlide);
sliderRouter.delete("/:id", deleteSlide);

export default sliderRouter;
