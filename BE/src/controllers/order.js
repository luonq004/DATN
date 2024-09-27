import Address from "../models/Address";
import Order from "../models/order";
import Product from "../models/product";

//=========================tạo đơn hàng mới===============
export const createOrder = async (req, res) => {
    const { userId, addressId, products, payment, totalPrice, name, shipping } = req.body;
    try {
        let finalAddressId = addressId;
        if (!addressId) {
            const { country, cityId, districtId, wardId, phone, addressDetail, email } = req.body;
            // Tạo địa chỉ mới
            const newAddress = new Address({
                userId,
                country,
                cityId,
                districtId,
                wardId,
                phone,
                addressDetail,
                email,
                name,
                isDefault: true,
            });
            // Lưu địa chỉ mới
            const saveAddress = await newAddress.save();
            finalAddressId = saveAddress._id;
            res.status(201).json({ message: "Địa chỉ đã được lưu", address: saveAddress });
        }
        // // Kiểm tra và cập nhật số lượng sản phẩm trong kho
        // for (const item of products) {
        //     const product = await Product.findById(item.productId);

        //     // Nếu không tìm thấy sản phẩm
        //     if (!product) {
        //         return res.status(404).json({ message: `Sản phẩm với ID ${item.productId} không tồn tại` });
        //     }

        //     // Kiểm tra nếu sản phẩm có đủ số lượng trong kho
        //     if (product.quantity < item.quantity) {
        //         return res.status(400).json({ message: `Sản phẩm ${product.name} không đủ số lượng trong kho` });
        //     }

        //     // Trừ số lượng sản phẩm trong kho dựa trên số lượng đặt hàng
        //     product.quantity -= item.quantity;
        //     await product.save();
        // }
        // Tạo đơn hàng
        const newOrder = new Order({
            userId,
            addressId: finalAddressId,
            products,
            payment,
            totalPrice,
            shipping,
        });
        // Lưu đơn hàng
        const savedOrder = await newOrder.save();

        res.status(201).json({ message: "Đơn hàng đã được tạo thành công", order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
    }
};

// ============================ Lấy tất cả đơn hàng ===========================
export const getAllOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        // Tìm tất cả đơn hàng và populate thông tin userId và addressId
        const orders = await Order.find({ userId })
        // Kiểm tra nếu không có đơn hàng
        if (orders.length === 0) {
            return res.status(404).json({ message: "Không có đơn hàng nào" });
        }
        // Trả về danh sách đơn hàng
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: error.message });
    }
};

// ============================ Lấy đơn hàng theo Id ===========================

export const getOrdersById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId)
        // Kiểm tra nếu không có đơn hàng
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        // Trả về đơn hàng
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error: error.message });
    }
};

// ============================ Top 10 san pham co luot mua nhieu nhat ===========================

export const Top10_productOrder = async (req, res) => {
    try {
        const { startDate, endDate, limit } = req.query;

        const productLimit = parseInt(limit) || 10;
        if (productLimit <= 0) {
            return res.status(400).json({ message: 'Limit phải lớn hơn 0!' });
        }

        // console.log(new Date(startDate), new Date(endDate))


        const topSpendingProduct = await Order.aggregate([
            { $unwind: "$products" },   //mảng sản phẩm
            {
                $match: {
                    "createdAt": {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: "$products.productId",  // Nhóm theo id sản phẩm
                    totalQuantity: { $sum: "$products.quantity" }  // Sum the quantities sold
                }
            },
            { $sort: { totalQuantity: -1 } },  // Tổng hợp số lượng đã bán
            { $limit: productLimit }
        ]);
        console.log(topSpendingProduct);
        //Kiểm tra xem kết quả có trống không
        if (topSpendingProduct.length === 0) {
            return res.status(404).json({ message: 'Không có sản phẩm nào được bán trong khoảng thời gian này!' });
        }
        // những sản phẩm bán chạy nhất
        res.status(200).json(topSpendingProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu!' });
    }
};
