
import { Router } from 'express';
import SliderController from '../Controllers/slider';

const sliderRouter = Router();
const sliderController = new SliderController();

sliderRouter.get("/", sliderController.getAllSlides);
sliderRouter.get("/:id", sliderController.getSlideDetail);
sliderRouter.post("/", sliderController.createSlide);
sliderRouter.put("/:id", sliderController.updateSlide);
sliderRouter.delete("/:id", sliderController.deleteSlide);

export default sliderRouter;
