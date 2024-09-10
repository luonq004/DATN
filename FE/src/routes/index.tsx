
import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "../pages/(website)/layout";
import CartPage from "../pages/(website)/cart/page";
import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import Order from "../pages/(website)/cart/_components/Order";
import ShopPage from "@/pages/(website)/shop/page";
import ProductsAll from "@/pages/(website)/shop/_components/ProductsAll";
import DetailPage from "@/pages/(website)/details/page";
import CheckOut from "@/pages/(website)/cart/_components/CheckOut";
import HomePage from "@/pages/(website)/homepage/Homepage";

const Router = () => {
  return <>
    <Routes>
      <Route path="/" element={<LayoutWebsite />} >
        <Route index path="" element={<HomePage />} />
        
        <Route path="product/:id" element={<DetailPage />} />

        <Route path="shop" element={<ShopPage />}>
          <Route index element={<ProductsAll />} />
        </Route>

        <Route path="cart" element={<CartPage />} >
          <Route index element={<ShoppingCart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Route>
    </Routes>
  </>;
};

export default Router;