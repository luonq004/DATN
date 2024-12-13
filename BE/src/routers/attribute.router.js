import express from "express";
import {
  createAttribute,
  deleteAttribute,
  getAllAttribute,
  getAttributeById,
  updateAttribute,
  displayAttribute,
} from "../controllers/attribute";

const attributeRouter = express.Router();

attributeRouter.get("/attributes", getAllAttribute);
attributeRouter.get("/attributes/:id", getAttributeById);
attributeRouter.post("/attributes", createAttribute);
attributeRouter.put("/attributes/:id", updateAttribute);
attributeRouter.delete("/attributes/:id", deleteAttribute);
attributeRouter.post("/attributes/:id/display", displayAttribute);

export default attributeRouter;
