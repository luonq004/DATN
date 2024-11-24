import Comment from "../models/comment";
import Product from "../models/product";
import User from "../models/users";

export const createComment = async (req, res) => {
  try {
    const { userId, productId, content, rating } = req.body;
    const comment = await Comment({
      userId,
      productId,
      content,
      rating,
    }).save();

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy user" });
    }
    product.comments.push(comment._id);

    await product.save();

    res.status(201).json({
      message: "Tạo comment thành công",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const comment = await Comment.findOne({ _id: id });

    if (!comment) {
      return res.status(400).json({ message: "Không tìm thấy comment" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(400).json({ message: "Không có quyền xóa comment" });
    }

    comment.deleted = true;

    await comment.save();

    res.json({ message: "Xóa comment thành công", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
