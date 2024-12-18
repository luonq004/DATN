import Attribute from "../models/attribute";

export const createAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.create(req.body);
    res.status(201).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.find()
      .populate({
        path: "values",
        model: "AttributeValue",
        select: "-__v",
      })
      .select("-__v");
    if (attribute.length < 0) {
      return res.status(404).json({ message: "No attribute found" });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findOne({ _id: req.params.id }).populate(
      "values"
    );
    if (attribute.length < 0) {
      return res.status(404).json({ message: "No attribute found" });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (attribute.length < 0) {
      return res.status(404).json({ message: "No attribute found" });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndDelete(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
