import { StatusCodes } from "http-status-codes"
import Cart from "../models/cart";

export const checkCartProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findOne({ userId: id });

        if (!cart) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy giỏ hàng" });
        }

        const products = cart.products.filter((product) => product.productItem !== null && product.variantItem !== null);
        cart.products = products;
        await cart.save();
        next();

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}