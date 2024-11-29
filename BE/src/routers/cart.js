import express from 'express'
import { addToCart, addVoucher, changeVariant, decrease, getCartByUserId, increase, removeCartProduct, updateCart, updateQuantity, revomeVoucherCart, selectedAllItem, selectedOneItem } from '../controllers/cart';
import { checkVoucherUsed } from '../middlewares/checkVoucherUsed';
import { checkCartProduct } from '../middlewares/checkCartProduct';
const routerCart = express.Router();

routerCart.get('/cart/:id', getCartByUserId);
routerCart.post('/cart/add', addToCart);
routerCart.put('/cart/increase', increase);
routerCart.put('/cart/decrease', decrease);
routerCart.put('/cart/remove', removeCartProduct);
routerCart.put('/cart/update', updateQuantity);
routerCart.put('/cart/add-voucher', checkVoucherUsed, addVoucher);
routerCart.put('/cart/remove-voucher', revomeVoucherCart);
routerCart.put('/cart/change-variant', changeVariant);
routerCart.put('/cart/selected-all', selectedAllItem);
routerCart.put('/cart/selected-one', selectedOneItem);

routerCart.put('/cart/update/:id', updateCart);

export default routerCart;