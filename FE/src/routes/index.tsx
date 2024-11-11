import DashBoardPage from "@/pages/(dashboard)/dashboard/page";
import ProductAddPage from "@/pages/(dashboard)/product/add/page";
import ProductPage from "@/pages/(dashboard)/product/page";

import LayoutAdmin from "@/pages/(dashboard)/layout";
import ListUser from "@/pages/(dashboard)/user/_component/ListUser";
import CheckOut from "@/pages/(website)/cart/_components/CheckOut";
import DetailPage from "@/pages/(website)/details/page";
import HomePage from "@/pages/(website)/homepage/page";
import ProductShopPage from "@/pages/(website)/shop/page";

import AddLogoPage from "@/pages/(dashboard)/logo/_components/AddLogo";
import ListLogoPage from "@/pages/(dashboard)/logo/_components/ListLogo";
import UpdateLogoPage from "@/pages/(dashboard)/logo/_components/UpdateLogo";
import LogoPage from "@/pages/(dashboard)/logo/page";
import AddSlider from "@/pages/(dashboard)/slider/_components/AddSlide";
import ListSlider from "@/pages/(dashboard)/slider/_components/ListSlider";
import UpdateSlider from "@/pages/(dashboard)/slider/_components/UpdateSlider";
import SliderPage from "@/pages/(dashboard)/slider/page";
import UserDetailPage from "@/pages/(dashboard)/user/_component/DetailUser";
import UserPage from "@/pages/(dashboard)/user/page";
import HomePageNew from "@/pages/(website)/homepagenew/page";
import SidebarAccount from "@/pages/(website)/user/_components/Sidebar";
import ProfilePage from "@/pages/(website)/user/page";
import { Route, Routes } from "react-router-dom";
import Order from "../pages/(website)/cart/_components/Order";
import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import CartPage from "../pages/(website)/cart/page";
import LayoutWebsite from "../pages/(website)/layout";
import DemoPage from "@/pages/(dashboard)/voucher/page";
import AboutUsPage from "@/pages/(website)/aboutus/page";
import AdminOrder from "@/pages/(dashboard)/Order/Order";
import PageServices from "@/pages/(website)/services/PageServices";
import { SignIn, SignUp } from "@clerk/clerk-react";

const Router = () => {
  return (
    <>
      <Routes>
        {/* <Route index path="homepage" element={<HomePageNew />} /> */}
        <Route path="/" element={<LayoutWebsite />}>
          <Route index path="" element={<HomePageNew />} />

          <Route path="users" element={<ProfilePage />}>
            <Route index element={<SidebarAccount />} />
          </Route>

          <Route path="product/:id" element={<DetailPage />} />

          {/* <Route path="shop" element={<ShopPage />}>
            <Route index element={<ProductsAll />} />
          </Route> */}
          {/* </Route> */}

          {/* <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} /> */}

          <Route path="services1" element={<PageServices />} />
          <Route path="cart" element={<CartPage />}>
            <Route index element={<ShoppingCart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="order" element={<Order />} />
          </Route>

          <Route path="about" element={<AboutUsPage />} />

          <Route path="shopping" element={<ProductShopPage />} />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<DashBoardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/add" element={<ProductAddPage />} />
          <Route path="products/edit/:id" element={<ProductAddPage />} />
        </Route>

        <Route path="/dashboard" element={<LayoutAdmin />}>
          <Route path="users" element={<UserPage />}>
            <Route index element={<ListUser />} />
            <Route path="detail/:clerkId" element={<UserDetailPage />} />
          </Route>

          <Route path="sliders" element={<SliderPage />}>
            <Route index element={<ListSlider />} />
            <Route path="add" element={<AddSlider />} />
            <Route path="edit/:id" element={<UpdateSlider />} />
          </Route>

          <Route path="logos" element={<LogoPage />}>
            <Route index element={<ListLogoPage />} />
            <Route path="add" element={<AddLogoPage />} />
            <Route path="edit/:id" element={<UpdateLogoPage />} />
          </Route>
          <Route path="voucher" element={<DemoPage />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
