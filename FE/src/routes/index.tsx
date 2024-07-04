import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "@/pages/(dashboard)/layout";
import CheckOut from "@/pages/website/cart/CheckOutPayment/CheckOut";
import OrderComplete from "@/pages/website/cart/OrderComplete/OrderComplete";

const Router = () => {
  return <>
  <Routes>
    <Route path="/" element={<LayoutWebsite/>}>
    <Route path="/checkout" element={<CheckOut/>}/>
    <Route path="/orderComplete" element={<OrderComplete/>}/>
    </Route>
  </Routes>
  </>;
};

export default Router;
