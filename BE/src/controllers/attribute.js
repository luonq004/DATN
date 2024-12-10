import Attribute from "../models/attribute";

async function checkAttributeExist(name) {
  const slugCheck = name
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();

  // Tìm một tài liệu phù hợp
  const exists = await Attribute.findOne({ slug: slugCheck });

  // Trả về true nếu tài liệu tồn tại, ngược lại false
  return !!exists;
}

export const createAttribute = async (req, res) => {
  try {
    const { name } = req.body;

    const existAttribute = await checkAttributeExist(name);

    if (existAttribute) {
      return res.status(400).json({ message: "Thuộc tính đã tồn tại" });
    }

    const attribute = await Attribute.create({
      name: name.replace(/\s+/g, " ").trim(),
      slug: name.replace(/\s+/g, " ").trim().replace(/ /g, "-").toLowerCase(),
    });
    res.status(201).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.find({ deleted: false })
      .populate({
        path: "values",
        match: { deleted: false },
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
    const { name } = req.body;

    const existAttribute = await checkAttributeExist(name);

    if (existAttribute) {
      return res.status(400).json({ message: "Tên thuộc tính đã tồn tại" });
    }

    const attribute = await Attribute.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name.replace(/\s+/g, " ").trim(),
        slug: name.replace(/\s+/g, " ").trim().replace(/ /g, "-").toLowerCase(),
      },
      { new: true }
    );

    // if (attribute.length < 0) {
    //   return res.status(404).json({ message: "Không tìm thấy thuộc tính" });
    // }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true },
      { new: true }
    );
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
