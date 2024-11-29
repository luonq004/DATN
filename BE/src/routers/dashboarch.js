import { Router } from "express";
import { getDataAreaChart, getDataCard, getDataCategory, getDataTopProducts, getDataUserList } from "../controllers/dashboard";

const dashboardRouter = Router();

dashboardRouter.get("/get-data-card", getDataCard);
dashboardRouter.get("/get-data-area-chart", getDataAreaChart);
dashboardRouter.get("/get-data-user-list", getDataUserList);
dashboardRouter.get("/get-data-top-products", getDataTopProducts);
dashboardRouter.get("/get-data-category", getDataCategory);

export default dashboardRouter;