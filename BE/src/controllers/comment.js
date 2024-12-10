import Comment from "../models/comment";
import Order from "../models/order";
import Product from "../models/product";
import User from "../models/users";

export const createComment = async (req, res) => {
  try {
    const {
      userId,
      productId,
      infoProductBuy,
      content,
      rating,
      orderId,
      itemId,
    } = req.body;

    console.log(req.body);

    const product = await Product.findOne({ _id: productId, deleted: false });

    if (!product) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy user" });
    }

    const order = await Order.findOne({ _id: orderId });
    console.log(order);

    if (!order) {
      return res.status(400).json({ message: "Không tìm thấy order" });
    }

    const comment = await Comment({
      userId,
      productId,
      infoProductBuy,
      content,
      rating,
    }).save();

    product.comments.push(comment._id);

    await product.save();
    order.products.forEach((item) => {
      if (item._id.toString() === itemId) {
        item.statusComment = false;
        item.isCommented = true;
      }
    });

    order.markModified("products");

    await order.save();

    res.status(201).json({
      message: "Comment thành công",
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

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find(); // Lọc các comment không bị xóa
    // .populate("userId", "name email") // Populate userId, chỉ lấy các trường `name` và `email`
    // .populate("productId", "name price"); // Populate productId, chỉ lấy các trường `name` và `price`

    if (!comments) {
      return res.status(400).json({ message: "Không tìm thấy comment" });
    }

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
