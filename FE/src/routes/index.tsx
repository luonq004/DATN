import DashBoardPage from "@/pages/(dashboard)/dashboard/page";
import ProductAddPage from "@/pages/(dashboard)/product/add/page";
import ProductPage from "@/pages/(dashboard)/product/page";

import LayoutAdmin from "@/pages/(dashboard)/layout";
import ListUser from "@/pages/(dashboard)/user/_component/ListUser";
import CheckOut from "@/pages/(website)/cart/_components/CheckOut";

import ProductShopPage from "@/pages/(website)/shop/page";

import AddLogoPage from "@/pages/(dashboard)/logo/_components/AddLogo";
import ListLogoPage from "@/pages/(dashboard)/logo/_components/ListLogo";
import UpdateLogoPage from "@/pages/(dashboard)/logo/_components/UpdateLogo";
import LogoPage from "@/pages/(dashboard)/logo/page";
import AdminOrder from "@/pages/(dashboard)/Order/Order";
import AddSlider from "@/pages/(dashboard)/slider/_components/AddSlide";
import ListSlider from "@/pages/(dashboard)/slider/_components/ListSlider";
import UpdateSlider from "@/pages/(dashboard)/slider/_components/UpdateSlider";
import SliderPage from "@/pages/(dashboard)/slider/page";
import UserDetailPage from "@/pages/(dashboard)/user/_component/DetailUser";
import UserPage from "@/pages/(dashboard)/user/page";
import DemoPage from "@/pages/(dashboard)/voucher/page";
import AboutUsPage from "@/pages/(website)/aboutus/page";
import HomePageNew from "@/pages/(website)/homepagenew/page";
import PageServices from "@/pages/(website)/services/PageServices";
import SidebarAccount from "@/pages/(website)/user/_components/Sidebar";
import ChangePassword from "@/pages/(website)/user/_components/UpdatePasswordUser";
import ProfilePage from "@/pages/(website)/user/page";
import { Route, Routes } from "react-router-dom";

import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import CartPage from "../pages/(website)/cart/page";
import LayoutWebsite from "../pages/(website)/layout";

import ListAddress from "@/pages/(website)/address/ListAddress";
import VoucherStorage from "@/pages/(website)/user/_components/VoucherStorage";
import SuccessPage from "@/pages/(website)/cart/_components/SuccessPage ";
import OrderHistory from "@/pages/(website)/orderHistory/OrderHistory";

import RegisterForm from "@/pages/(dashboard)/user/_component/RegisterForm";

import AttributesPage from "@/pages/(dashboard)/attribute/page";
import AttributeValuePage from "@/pages/(dashboard)/attributeValue/page";
import ProductDetail from "@/pages/(website)/product/page";
import OrderDetail from "@/pages/(dashboard)/Order/OrderDetail";
import NotFound from "@/components/Notfound";
import UpdateAttributePage from "@/pages/(dashboard)/attribute/edit/page";
import CreateAttributePage from "@/pages/(dashboard)/attribute/add/page";
import UpdateAttributeValuePage from "@/pages/(dashboard)/attributeValue/edit/page";
import CreateAttributeValuePage from "@/pages/(dashboard)/attributeValue/add/page";

const Router = () => {
  return (
    <>
      <Routes>
        {/* <Route index path="homepage" element={<HomePageNew />} /> */}
        <Route path="/" element={<LayoutWebsite />}>
          <Route index path="" element={<HomePageNew />} />

          <Route path="users" element={<SidebarAccount />}>
            <Route index element={<ProfilePage />} />
            {/* địa chỉ */}
            <Route path="dia-chi" element={<ListAddress />} />

            <Route path="voucher" element={<VoucherStorage />} />
            <Route path="password" element={<ChangePassword />} />

            {/* lịch sử mua hàng */}
            <Route path="order-history" element={<OrderHistory />} />
          </Route>

          <Route path="product/:id" element={<ProductDetail />} />

          {/* <Route path="shop" element={<ShopPage />}>
            <Route index element={<ProductsAll />} />
          </Route> */}
          {/* </Route> */}

          {/* <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} /> */}

          <Route path="services" element={<PageServices />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="shopping" element={<ProductShopPage />} />

          <Route path="cart" element={<CartPage />}>
            <Route index element={<ShoppingCart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="order" element={<SuccessPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<DashBoardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/add" element={<ProductAddPage />} />
          <Route path="products/edit/:id" element={<ProductAddPage />} />

          <Route path="users" element={<UserPage />}>
            <Route index element={<ListUser />} />
            <Route path="detail/:clerkId" element={<UserDetailPage />} />
            <Route
              path="create-user"
              element={
                <RegisterForm
                  onClose={() => console.log("Form đóng lại")}
                  onSuccess={() => console.log("Đăng ký thành công")}
                />
              }
            />
          </Route>

          <Route path="sliders" element={<SliderPage />}>
            <Route index element={<ListSlider />} />
            <Route path="add" element={<AddSlider />} />
            <Route path="edit/:id" element={<UpdateSlider />} />
          </Route>

          <Route path="attributes" element={<AttributesPage />} />
          <Route path="attributes/edit/:id" element={<UpdateAttributePage />} />
          <Route path="attributes/add" element={<CreateAttributePage />} />

          <Route path="attributesValues/:id" element={<AttributeValuePage />} />
          <Route
            path="attributesValues/:id/add"
            element={<AttributeValuePage />}
          />
          <Route
            path="attributesValues/:id/edit"
            element={<UpdateAttributeValuePage />}
          />

          <Route
            path="attributesValues/add/:id"
            element={<CreateAttributeValuePage />}
          />

          <Route path="logos" element={<LogoPage />}>
            <Route index element={<ListLogoPage />} />
            <Route path="add" element={<AddLogoPage />} />
            <Route path="edit/:id" element={<UpdateLogoPage />} />
          </Route>
          <Route path="voucher" element={<DemoPage />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="orders/orderdetails/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
