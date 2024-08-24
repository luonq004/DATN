import express from "express";
import { createAttributeValue, getAllAttributeValue, getAttributeValueById, removeAttributeValue, updateAttributeValue } from "../controllers/attributeValue";

const attributeValueRouter = express.Router();

attributeValueRouter.get('/attributevalue', getAllAttributeValue);
attributeValueRouter.get('/attributevalue/:id', getAttributeValueById);
attributeValueRouter.post('/attributevalue/:id', createAttributeValue);
attributeValueRouter.put('/attributevalue/:id', updateAttributeValue);
attributeValueRouter.delete('/attributevalue/:id', removeAttributeValue);

export default attributeValueRouter
