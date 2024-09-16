// import User from "../models/user";

// export const createUser = async (req, res) => {
//     try {
//         const user = await User.create({ ...req.body });
//         return res.status(201).json(user)
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }


import Joi from "joi";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import Order from "../models/order";

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "any.required": "Trường Name là bắt buộc",
        "string.empty": "Trường Name không được để trống",
        "string.min": "Trường Name phải có ít nhất {#limit} ký tự",
        "string.max": "Trường Name không được vượt quá {#limit} ký tự",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Trường Email là bắt buộc",
        "string.empty": "Trường Email không được để trống",
        "string.email": "Trường Email phải là email hợp lệ",
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "any.required": "Trường Password là bắt buộc",
        "string.empty": "Trường Password không được để trống",
        "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
        "string.max": "Trường Password không được vượt quá {#limit} ký tự",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Trường Confirm Password là bắt buộc",
        "any.only": "Mật khẩu không trùng khớp",
    }),
    avatar: Joi.string().uri().messages({
        "string.uri": "Trường Avatar phải là đường dẫn hợp lệ",
    }),
});

export const signup = async (req, res) => {
    const { email, password, name, avatar } = req.body;
    console.log(req.body);
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    console.log(error);
    if (error) {
        const messages = error.details.map((item) => item.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });

    return res.status(StatusCodes.CREATED).json({
        user,
    });
};


export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ["Email khong ton tai"],
        });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: ["Mat khau khong chinh xac"],
        });
    }

    const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "7d",
    });

    return res.status(StatusCodes.OK).json({
        user,
        token,
    });
};

// Top 10 user mua hang nhieu nhat

export const getTopUsers = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // console.log(req.query)

        const topSpendingUsers = await Order.aggregate([
            // { $unwind: "$orders" },
            {
                $match: {
                    "createdAt": {
                        $gte: new Date("2024-02-07T14:25:03.435+00:00"), // nhờ so sánh tgian phải định dạng ntn
                        $lte: new Date("2024-09-07T23:59:59.999+00:00")
                    }
                }
            },
            {
                $group: {
                    _id: "$userId",
                    name: { $first: "$name" }, // khong có field name trong model của model nên trả về bị null
                    email: { $first: "$email" }, // khong có field name trong model của model nên trả về bị null
                    totalSpent: { $sum: { $multiply: ["$orders.quantity", "$orders.price"] } }
                }
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 10 }
        ]);

        // const topSpendingUsers = await Order.find({
        //     createdAt: {
        //         $gte: new Date("2024-04-07T14:25:03.435+00:00"),
        //         $lte: new Date("2024-04-07T23:59:59.999+00:00")
        //     }
        // })

        console.log(topSpendingUsers)

        // const topSpendingUsers = await Order.find().sort({ totalPurchase: -1 }).limit(10);
        if (topSpendingUsers.length === 0) {
            return res.status(404).json({ message: 'Không có user nào trong khoảng thời gian này!' });
        }

        res.status(200).json(topSpendingUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu!' });
    }
};
