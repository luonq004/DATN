import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "../pages/(website)/layout";
import CartPage from "../pages/(website)/cart/page";
import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import CheckOut from "../pages/(website)/cart/_components/CheckOut";
import Order from "../pages/(website)/cart/_components/Order";

const Router = () => {
  return <>
    <Routes>
      <Route path="/" element={<LayoutWebsite />} >
        <Route path="cart" element={<CartPage />} >
          <Route index element={<ShoppingCart />} />
          <Route path="check-out" element={<CheckOut />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Route>
    </Routes>
  </>;
};

export default Router;