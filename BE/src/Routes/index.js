import { Router } from "express";
import sliderRouter from "./slider";
import productsRouter from "./Products";
import collectionRouter from "./Collections";
import router_author from "./users";
import categoriesRouter from "./Categories";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/sliders", sliderRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/collections", collectionRouter)
router.use("/users", router_author)


export default router;
