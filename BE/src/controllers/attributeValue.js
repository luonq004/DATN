import Attribute from "../models/attribute";
import AttributeValue from "../models/attributeValue";

export const getAllAttributeValue = async (req, res) => {
  try {
    const response = await AttributeValue.find();
    if (response.length < 0) {
      return res.status(404).json({ message: "No Attribute Value found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttributeValueById = async (req, res) => {
  try {
    const response = await AttributeValue.findOne({ _id: req.params.id });
    if (response.length < 0) {
      return res.status(404).json({ message: "No Attribute Value found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttributeValueByAttributeId = async (req, res) => {
  try {
    const data = await Attribute.find({
      _id: req.params.id,
      deleted: false,
    }).populate({
      path: "values",
      model: "AttributeValue",
      match: { deleted: false },
      select: "-__v",
    });
    if (data.length < 0) {
      return res.status(404).json({ message: "No Attribute Value found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAttributeValue = async (req, res) => {
  try {
    const id = req.params.id; //id Attribute

    const { name, value } = req.body;

    const checkName = await checkNameExist(name);

    if (checkName) {
      return res.status(400).json({
        message: "Tên giá trị thuộc tính đã tồn tại",
      });
    }

    const attribute = await Attribute.findOne({ _id: id });

    if (!attribute) {
      return res.status(404).json({ message: "Không tìm thấy thuộc tính" });
    }

    const response = await AttributeValue.create({
      name: name.replace(/\s+/g, " ").trim(),
      slugName: name
        .replace(/\s+/g, " ")
        .trim()
        .replace(/ /g, "-")
        .toLowerCase(),
      value,
    });

    const addValue = {
      ...attribute._doc,
      values: [...attribute.values, response._id],
    };
    const attributeNewValue = await Attribute.findOneAndUpdate(
      { _id: id },
      addValue,
      { new: true }
    ).populate({
      path: "values",
      model: "AttributeValue",
      match: { deleted: false },
      select: "-__v",
    });

    return res.status(201).json({
      message: "Giá trị thuộc tính đã được tạo",
      data: attributeNewValue,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAttributeValue = async (req, res) => {
  try {
    const { name, type, value, _id } = req.body;

    const attributeValue = await AttributeValue.findOne({
      _id: req.params.id,
      deleted: false,
    });

    if (!attributeValue) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giá trị attribute" });
    } else {
      if (name === attributeValue.name) {
        const response = await AttributeValue.findOneAndUpdate(
          { _id: req.params.id },
          {
            name: name.replace(/\s+/g, " ").trim(),
            slugName: name
              .replace(/\s+/g, " ")
              .trim()
              .replace(/ /g, "-")
              .toLowerCase(),
            type,
            value,
          },
          { new: true }
        );

        if (response.length < 0) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy giá trị attribute" });
        }

        return res.status(200).json({
          message: "Giá trị attribute đã được cập nhật",
          data: response,
        });
      } else {
        const checkName = await checkNameExist(name);

        if (checkName) {
          return res.status(400).json({
            message: "Tên giá trị thuộc tính đã tồn tại",
          });
        } else {
          const attribute = await Attribute.findOne({ _id: req.params.id });

          if (!attribute) {
            return res
              .status(404)
              .json({ message: "Không tìm thấy thuộc tính" });
          }

          const response = await AttributeValue.findOneAndUpdate(
            { _id: req.params.id },
            {
              name: name.replace(/\s+/g, " ").trim(),
              slugName: name
                .replace(/\s+/g, " ")
                .trim()
                .replace(/ /g, "-")
                .toLowerCase(),
              type,
              value,
            },
            { new: true }
          );

          if (response.length < 0) {
            return res
              .status(404)
              .json({ message: "Không tìm thấy giá trị attribute" });
          }

          return res.status(200).json({
            message: "Giá trị attribute đã được cập nhật",
            data: response,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeAttributeValue = async (req, res) => {
  try {
    const response = await AttributeValue.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true },
      { new: true }
    );
    if (response.length < 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giá trị attribute" });
    }

    return res.status(200).json({
      message: "Giá trị attribute đã được xóa",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Utils
async function checkNameExist(name) {
  const slugCheck = name
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();

  // Tìm một tài liệu phù hợp
  const exists = await AttributeValue.findOne({ slugName: slugCheck });

  // Trả về true nếu tài liệu tồn tại, ngược lại false
  return !!exists;
}
