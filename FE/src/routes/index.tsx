import { Route, Routes } from "react-router-dom";
import CheckOut from "../pages/website/cart/CheckOut";
import LayoutWebsite from "@/pages/(dashboard)/layout";

const Router = () => {
  return <>
  <Routes>
    <Route path="/" element={<LayoutWebsite/>}>
    <Route index element={<CheckOut/>}/>
    </Route>
  </Routes>
  </>;
};

export default Router;
