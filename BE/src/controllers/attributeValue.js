import Attribute from "../models/attribute";
import AttributeValue from "../models/attributeValue";

export const getAllAttributeValue = async (req, res) => {
    try {
        const response = await AttributeValue.find();
        if (response.length < 0) {
            return res.status(404).json({ message: "No Attribute Value found" })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAttributeValueById = async (req, res) => {
    try {
        const response = await AttributeValue.findOne({ _id: req.params.id });
        if (response.length < 0) {
            return res.status(404).json({ message: "No Attribute Value found" });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAttributeValue = async (req, res) => {
    try {
        const id = req.params.id; //id Attribute
        const response = await AttributeValue.create(req.body);
        const attribute = await Attribute.findOne({ _id: id });
        const addValue = {
            ...attribute._doc,
            values: [...attribute.values, response._id]
        }
        const attributeNewValue = await Attribute.findOneAndUpdate({ _id: id }, addValue, { new: true });
        return res.status(201).json(attributeNewValue);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateAttributeValue = async (req, res) => {
    try {
        const response = await AttributeValue.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (response.length < 0) {
            return res.status(404).json({ message: "No Attribute Value found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeAttributeValue = async (req, res) => {
    try {
        const id = req.params.id //id Attribute Value
        const response = await AttributeValue.findOneAndDelete({ _id: id });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}