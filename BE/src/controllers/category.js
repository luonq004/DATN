import slugify from "slugify";
import Category from "../models/category"

export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        if (category.length < 0) {
            return res.status(400).json({ message: "No category found" });
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        if (category.length < 0) {
            return res.status(400).json({ message: "No category found" });
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create({ ...req.body, slug: slugify(req.body.name, "-") });
        return res.status(201).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (category.length < 0) {
            return res.status(400).json({ message: "No category found" });
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        if (category.length < 0) {
            return res.status(400).json({ message: "No category found" });
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}