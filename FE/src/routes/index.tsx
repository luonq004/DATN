import LayoutAdmin from "@/pages/(dashboard)/layout";
import Slider from "@/pages/(dashboard)/slider/page";
import CheckOut from "@/pages/(website)/cart/_components/CheckOut";
import DetailPage from "@/pages/(website)/details/page";
import HomePage from "@/pages/(website)/homepage/Homepage";
import ProductsAll from "@/pages/(website)/shop/_components/ProductsAll";
import ShopPage from "@/pages/(website)/shop/page";
import { Route, Routes } from "react-router-dom";
import Order from "../pages/(website)/cart/_components/Order";
import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import CartPage from "../pages/(website)/cart/page";
import LayoutWebsite from "../pages/(website)/layout";
import NotFound from "@/components/404!/Notfound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index path="" element={<HomePage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="shop" element={<ShopPage />}>
          <Route index element={<ProductsAll />} />
        </Route>
        <Route path="cart" element={<CartPage />}>
          <Route index element={<ShoppingCart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="slider" element={<Slider />} />
      </Route>
      <Route path="*" element={<NotFound/>} />
      <Route path="404" element={<NotFound/>} />
    </Routes>
  );
};

export default Router;
