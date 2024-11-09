import express from "express";
import {
  createAttribute,
  deleteAttribute,
  getAllAttribute,
  getAttributeById,
  updateAttribute,
} from "../controllers/attribute";

const attributeRouter = express.Router();

attributeRouter.get("/attributes", getAllAttribute);
attributeRouter.get("/attributes/:id", getAttributeById);
attributeRouter.post("/attributes", createAttribute);
attributeRouter.put("/attributes/:id", updateAttribute);
attributeRouter.delete("/attributes/:id", deleteAttribute);

export default attributeRouter;
