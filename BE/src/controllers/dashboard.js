import { StatusCodes } from "http-status-codes";
import Order from "../models/order";
import Product from "../models/product";
import Users from "../models/users";

export const getDataCard = async (req, res) => {
    try {
        const order = await Order.find();
        const total = order.reduce((acc, item) => item.status === "đã hoàn thành" ? acc + item.totalPrice : acc, 0);
        const product = await Product.find();
        const user = await Users.find();
        const data = { total: total, order: order.length, product: product.length, user: user.length };
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getDataAreaChart = async (req, res) => {
    try {
        const chartData = await Order.aggregate([
            {
                // Lọc các đơn hàng có status: "đã hoàn thành"
                $match: { status: "đã hoàn thành" },
            },
            {
                // Tạo một trường mới "date" chỉ chứa ngày (YYYY-MM-DD)
                $addFields: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                },
            },
            {
                // Nhóm theo "date" và tính tổng doanh thu trong ngày
                $group: {
                    _id: "$date", // Nhóm theo ngày
                    total: { $sum: "$totalPrice" }, // Tính tổng doanh thu
                },
            },
            {
                // Đổi tên trường _id thành "date" trong kết quả
                $project: {
                    _id: 0, // Loại bỏ _id
                    date: "$_id",
                    total: 1,
                },
            },
            {
                // Sắp xếp kết quả theo ngày tăng dần
                $sort: { date: 1 },
            },
        ]);

        return res.status(StatusCodes.OK).json(chartData);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getDataUserList = async (req, res) => {
    try {
        const topUsers = await Order.aggregate([
            {
                $group: {
                    _id: "$userId", // Nhóm theo userId
                    totalSpent: { $sum: "$totalPrice" }, // Tính tổng tiền cho mỗi user
                },
            },
            {
                $sort: { totalSpent: -1 }, // Sắp xếp theo tổng tiền chi tiêu giảm dần
            },
            {
                $limit: 5, // Giới hạn số lượng kết quả 
            },
            {
                $lookup: {
                    from: "users", // Tên của collection người dùng (nếu khác thì chỉnh lại)
                    localField: "_id", // Trường userId trong Order
                    foreignField: "_id", // Trường _id trong collection User
                    as: "userDetails", // Thêm thông tin người dùng vào kết quả
                },
            },
            {
                $unwind: "$userDetails", // Làm phẳng userDetails thành một đối tượng
            },
            {
                $project: {
                    userId: "$_id",
                    totalSpent: 1,
                    userName: { $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"] }, // Lấy tên người dùng
                    userEmail: "$userDetails.email", // Lấy email người dùng
                    userAvatar: "$userDetails.imageUrl", // Lấy avatar người dùng
                },
            },
        ]);

        return res.status(StatusCodes.OK).json(topUsers);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getDataTopProducts = async (req, res) => {
    try {
        const result = await Order.aggregate([
            // Bóc tách danh sách sản phẩm từ mỗi đơn hàng
            { $unwind: "$products" },
            { $unwind: "$products.products" },

            // Gom nhóm dữ liệu theo sản phẩm (dựa trên variantItem._id)
            {
                $group: {
                    _id: "$products.products.variantItem._id", // Gom nhóm theo ID của variantItem
                    productName: { $first: "$products.products.productItem.name" },
                    slug: { $first: "$products.products.productItem.slug" },
                    image: { $first: "$products.products.productItem.image" },
                    price: { $first: "$products.products.variantItem.price" }, // Lấy giá từ variantItem
                    quantity: { $sum: "$products.products.quantity" }, // Tổng số lượng bán
                    total: {
                        $sum: {
                            $multiply: [
                                { $ifNull: ["$products.products.quantity", 0] },
                                { $ifNull: ["$products.products.variantItem.price", 0] },
                            ],
                        },
                    }, // Tổng doanh thu
                },
            },

            // Sắp xếp theo tổng số lượng giảm dần
            { $sort: { quantity: -1 } },
        ]);

        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const getDataCategory = async (req, res) => {
    try {
        const result = await Order.aggregate([
            // Bóc tách danh sách sản phẩm từ mỗi đơn hàng
            { $unwind: "$products" },
            { $unwind: "$products.products" },

            // Bóc tách danh mục (category) từ mỗi sản phẩm
            { $unwind: "$products.products.productItem.category" },

            // Gom nhóm dữ liệu theo danh mục
            {
                $group: {
                    _id: "$products.products.productItem.category", // Gom nhóm theo danh mục
                    name: { $first: "$products.products.productItem.category.name" }, // Lấy tên danh mục
                    slug: { $first: "$products.products.productItem.category.slug" }, // Lấy slug danh mục
                    totalQuantity: { $sum: "$products.products.quantity" }, // Tổng số lượng bán
                    totalRevenue: {
                        $sum: {
                            $multiply: [
                                { $ifNull: ["$products.products.quantity", 0] },
                                { $ifNull: ["$products.products.variantItem.price", 0] },
                            ],
                        },
                    }, // Tổng doanh thu
                },
            },

            // Sắp xếp theo tổng số lượng bán giảm dần
            { $sort: { totalQuantity: -1 } },

            // Lấy top 5 danh mục
            { $limit: 5 },
        ]);

        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}