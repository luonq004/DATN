import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "../pages/(website)/layout";
import CartPage from "../pages/(website)/cart/page";
import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import Order from "../pages/(website)/cart/_components/Order";

import DetailPage from "@/pages/(website)/details/page";
import CheckOut from "@/pages/(website)/cart/_components/CheckOut";
import HomePage from "@/pages/(website)/homepage/Homepage";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import DashBoardPage from "@/pages/(dashboard)/dashboard/page";
import ProductPage from "@/pages/(dashboard)/product/page";
import ProductAddPage from "@/pages/(dashboard)/product/add/page";

import ProductShopPage from "@/pages/(website)/shop/page";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index path="" element={<HomePage />} />

          <Route path="product/:id" element={<DetailPage />} />
          {/* 
          <Route path="shop" element={<ProductShopPage />}>
            <Route index element={<ProductShopPage />} />
          </Route> */}

          <Route path="cart" element={<CartPage />}>
            <Route index element={<ShoppingCart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<DashBoardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/add" element={<ProductAddPage />} />
          <Route path="products/edit/:id" element={<ProductAddPage />} />
        </Route>

        <Route path="shopping" element={<ProductShopPage />} />
      </Routes>
    </>
  );
};

export default Router;
