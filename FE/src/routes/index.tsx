import LayoutAdmin from "@/pages/(dashboard)/layout";
import ListUser from "@/pages/(dashboard)/user/_component/ListUser";
import CheckOut from "@/pages/(website)/cart/_components/CheckOut";
import DetailPage from "@/pages/(website)/details/page";
import HomePage from "@/pages/(website)/homepage/page";
import ProductsAll from "@/pages/(website)/shop/_components/ProductsAll";
import ShopPage from "@/pages/(website)/shop/page";
import { Route, Routes } from "react-router-dom";
import Order from "../pages/(website)/cart/_components/Order";
import ShoppingCart from "../pages/(website)/cart/_components/ShoppingCart";
import CartPage from "../pages/(website)/cart/page";
import LayoutWebsite from "../pages/(website)/layout";
import UserDetailPage from "@/pages/(dashboard)/user/_component/DetailUser";
import UserPage from "@/pages/(dashboard)/user/page";
import SliderPage from "@/pages/(dashboard)/slider/page";
import ListSlider from "@/pages/(dashboard)/slider/_components/ListSlider";
import UpdateSlider from "@/pages/(dashboard)/slider/_components/UpdateSlider";
import AddSlider from "@/pages/(dashboard)/slider/_components/AddSlide";
import LogoPage from "@/pages/(dashboard)/logo/page";
import AddLogoPage from "@/pages/(dashboard)/logo/_components/AddLogo";
import UpdateLogoPage from "@/pages/(dashboard)/logo/_components/UpdateLogo";
import ListLogoPage from "@/pages/(dashboard)/logo/_components/ListLogo";
import SidebarAccount from "@/pages/(website)/user/_components/Sidebar";
import ProfilePage from "@/pages/(website)/user/page";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index path="" element={<HomePage />} />

          <Route path="users" element={<ProfilePage/>}>
            <Route index element={<SidebarAccount/>}/>
          </Route>

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

        <Route path="/dashboard" element={<LayoutAdmin />}>

          <Route path="users" element={<UserPage />}>
            <Route index element={<ListUser />} />
            <Route path="detail/:clerkId" element={<UserDetailPage />} />
          </Route>

          <Route path="sliders" element={<SliderPage />} >
            <Route index element={<ListSlider/>}/>
            <Route path="add" element={<AddSlider/>}/>
            <Route path="edit/:id" element={<UpdateSlider/>}/>
          </Route>

          <Route path="logos" element={<LogoPage />} >
            <Route index element={<ListLogoPage/>}/>
            <Route path="add" element={<AddLogoPage/>}/>
            <Route path="edit/:id" element={<UpdateLogoPage/>}/>
          </Route>
          
        </Route>

      </Routes>
    </>
  );
};

export default Router;
