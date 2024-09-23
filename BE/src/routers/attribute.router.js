import express from 'express';
import { createAttribute, deleteAttribute, getAllAttribute, getAttributeById, updateAttribute } from '../controllers/attribute';

const attributeRouter = express.Router();

attributeRouter.get("/attribute", getAllAttribute);
attributeRouter.get("/attribute/:id", getAttributeById);
attributeRouter.post("/attribute", createAttribute);
attributeRouter.put("/attribute/:id", updateAttribute);
attributeRouter.delete("/attribute/:id", deleteAttribute);

export default attributeRouter;