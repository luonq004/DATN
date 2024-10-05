import Product from "../models/product";
import slugify from "slugify";

export const getAllProducts = async (req, res) => {
  const {
    _page = 1,
    _limit = 12,
    _sort = "createAt",
    _order = "asc",
    _expand = true,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  const populateOptions = _expand
    ? [{ path: "category", select: "name" }, { path: "attribites" }]
    : [];
  try {
    const result = await Product.paginate({}, { ...options });

    if (result.docs.length === 0) throw new Error("No products found");

    const { data } = {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const data = await Product.find()
//       .populate("category")
//       .populate("attributes");
//     if (data.length < 0) {
//       return res.status(404).json({ message: "No products found" });
//     }
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getProductById = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id }).populate({
      path: "variants",
      populate: {
        path: "values",
        model: "AttributeValue",
      },
    });

    if (!data) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductForEdit = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).populate({
      path: "variants",
      populate: {
        path: "values",
        model: "AttributeValue",
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Chuyển đổi mảng variants, format lại chỉ values
    const arrVariants = product.variants.map((variant) => {
      // Format lại values thành mảng các object
      let formattedValues = variant.values.map((value) => {
        return {
          type: value.type, // Loại của giá trị (Color, Size, Material, ...)
          [value.type]: `${value._id}`, // Kết hợp id và giá trị
        };
      });

      // Giữ nguyên các thuộc tính khác của variant và chỉ thay đổi values
      return {
        _id: variant._id,
        price: variant.price,
        countOnStock: variant.countOnStock,
        image: variant.image,
        values: formattedValues, // Gán values đã format thành mảng object
      };
    });

    return res.status(200).json({
      ...product._doc, // Trả về tất cả các thông tin của sản phẩm
      variants: arrVariants, // Gán lại biến variants với format mới cho values
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const data = await Product({
      ...req.body,
      slug: slugify(req.body.name, "-"),
    }).save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (data.length < 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findOneAndDelete({ _id: req.params.id });
    if (data.length < 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
